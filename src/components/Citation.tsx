import { useState, useRef, useEffect, useCallback, Children } from 'react'
import InfoBox from './InfoBox'

interface CitationProps {
  children: React.ReactNode
}

interface CitationData {
  title?: string
  content: string
}

// Citation database - you can expand this with more entries
const citationDatabase: Record<string, CitationData> = {
  // Example entries - replace with your actual citation data
  'a': {
    title: 'Letter A',
    content: 'This is information about the letter A and its significance in the text.'
  },
  'Juno': {
    title: 'Goddess Juno',
    content: 'Juno is the Roman goddess of marriage and childbirth, queen of the gods and wife of Jupiter.'
  },
  'Thebes': {
    title: 'City of Thebes',
    content: 'Ancient Greek city-state in Boeotia, famous for its seven gates and the tragic stories of Oedipus and his descendants.'
  },
  'Polynices': {
    title: 'Polynices',
    content: 'Son of Oedipus, brother of Eteocles. He led the Seven Against Thebes in an attempt to claim his rightful throne.'
  },
  'Eteocles': {
    title: 'Eteocles',
    content: 'Son of Oedipus, brother of Polynices. He refused to give up the throne of Thebes, leading to the fraternal war.'
  },
  '俄狄浦斯': {
    title: 'Oedipus',
    content: 'Son of Oedipus, brother of Polynices. He refused to give up the throne of Thebes, leading to the fraternal war.'
  }
}

// Global state to track the currently open citation (reusing the same system as Elaboration)
let currentOpenCitation: (() => void) | null = null

const Citation = ({ children }: CitationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeRef = useRef<(() => void) | null>(null)

  // Extract text content from children for lookup - simple approach
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    if (node === null || node === undefined) return ''
    if (Array.isArray(node)) return node.map(getTextContent).join('')
    return ''
  }

  const citationKey = getTextContent(children).trim()
  const citationInfo = citationDatabase[citationKey]

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (currentOpenCitation === closeRef.current) {
      currentOpenCitation = null
    }
  }, [])

  // Store the close function in ref
  useEffect(() => {
    closeRef.current = handleClose
  }, [handleClose])

  const handleToggle = () => {
    // Only proceed if citation info exists
    if (!citationInfo) return

    // Close any currently open citation (if it's a different one)
    if (currentOpenCitation && currentOpenCitation !== closeRef.current) {
      currentOpenCitation()
    }
    
    // Toggle this citation
    if (isOpen) {
      handleClose()
    } else {
      setIsOpen(true)
      currentOpenCitation = closeRef.current
    }
  }

  // If no citation info found, render as plain text
  if (!citationInfo) {
    return <span className="text-gray-500" title="No citation information available">{children}</span>
  }

  return (
    <InfoBox
      trigger={
        <span 
          className="underline decoration-dotted cursor-pointer transition-colors"
          style={{ 
            color: 'var(--theme-text)',
            textDecorationColor: 'var(--theme-border)',
            textUnderlineOffset: '3px'
          }}
        >
          {children}
        </span>
      }
      title={citationInfo.title}
      content={citationInfo.content}
      isOpen={isOpen}
      onToggle={handleToggle}
      onClose={handleClose}
    />
  )
}

export default Citation