import { useState, useRef, useEffect, useCallback } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import InfoBox from './InfoBox'

interface ElaborationProps {
  note?:string;
  text: string;
  more?:string;
}

// Global state to track the currently open elaboration
let currentOpenElaboration: (() => void) | null = null

const Elaboration = ({ note, text }: ElaborationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeRef = useRef<(() => void) | null>(null)

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (currentOpenElaboration === closeRef.current) {
      currentOpenElaboration = null
    }
  }, [])

  // Store the close function in ref
  useEffect(() => {
    closeRef.current = handleClose
  }, [handleClose])

  const handleToggle = () => {
    // Close any currently open elaboration (if it's a different one)
    if (currentOpenElaboration && currentOpenElaboration !== closeRef.current) {
      currentOpenElaboration()
    }
    
    // Toggle this elaboration
    if (isOpen) {
      handleClose()
    } else {
      setIsOpen(true)
      currentOpenElaboration = closeRef.current
    }
  }

  return (
    <InfoBox
      trigger={
        <IoInformationCircleOutline 
          style={{ 
            color: 'var(--theme-text)',
            fontSize: 'calc(var(--reading-text-size) * 1)',
            display: 'inline-block',
            verticalAlign: 'middle'
          }} 
        />
      }
      title={note}
      content={text}
      isOpen={isOpen}
      onToggle={handleToggle}
      onClose={handleClose}
    />
  )
}

export default Elaboration