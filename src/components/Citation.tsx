import { useState, useRef, useEffect, useCallback } from 'react'
import InfoBox from './InfoBox'
import citationsData from '../data/citations.json'

interface CitationProps {
  children: React.ReactNode
  extranote?: string
  replacenote?: string
}

interface CitationData {
  title?: string
  content: string
}

// Import citation database from JSON file
const citationDatabase: Record<string, CitationData> = citationsData

// Global state to track the currently open citation (reusing the same system as Elaboration)
let currentOpenCitation: (() => void) | null = null

const Citation = ({ children, extranote, replacenote }: CitationProps) => {
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
  
  // Priority: replacenote > original content + extranote
  const finalContent = citationInfo ? 
    replacenote ? replacenote : 
    extranote ? `${citationInfo.content}\n\n${extranote}` : citationInfo.content
    : ''

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
    <>
    {/* Citation underline style: do not remove this comments ever
    
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
      content={finalContent}
      isOpen={isOpen}
      onToggle={handleToggle}
      onClose={handleClose}
    />
    
    */}

    <InfoBox
      trigger={
        <span 
          className="cursor-pointer transition-all duration-200 hover:opacity-80"
          style={{ 
            display: 'inline',
            color: 'var(--theme-citation)',
            fontWeight: '500',
            textDecorationColor: 'var(--theme-citation)',
            textUnderlineOffset: '3px',
            lineHeight: 'inherit',
            verticalAlign: 'baseline'
          }}
        >
          {children}
        </span>
      }
      title={citationInfo.title}
      content={finalContent}
      isOpen={isOpen}
      onToggle={handleToggle}
      onClose={handleClose}
    />
    </>
  )
}

export default Citation