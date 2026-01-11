import { useState, useEffect } from 'react'
import React from 'react'
import CommentModal from './CommentModal'
import Citation from './Citation'
import Elaboration from './Elaboration'
import commentsData from '../data/comments.json'

interface CommentData {
  id: string
  textSelection: string
  startOffset: number
  endOffset: number
  comment: string
  author: string
  timestamp: string
  likes: number
  replies: CommentReply[]
}

interface CommentReply {
  id: string
  comment: string
  author: string
  timestamp: string
  likes: number
}

interface CommentsProps {
  paragraphId: string
  children: React.ReactNode
}

const Comments = ({ paragraphId, children }: CommentsProps) => {
  const [comments, setComments] = useState<CommentData[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState<{top: number, left: number} | null>(null)
  const [selectedComments, setSelectedComments] = useState<CommentData[]>([])

  useEffect(() => {
    // Load comments for this paragraph
    const commentIds = (commentsData as any)[`${paragraphId}_comments`] || [];
    const allComments = (commentsData as any).comments || [];
    const paragraphComments = allComments.filter((c: any) => commentIds.includes(c.id));
    setComments(paragraphComments);
  }, [paragraphId]);




  const handleCommentClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, clickedText: string) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + 8,
      left: rect.left + rect.width / 2
    });
    // Filter comments for this specific selected text
    const filteredComments = comments.filter(c => c.textSelection === clickedText);
    setSelectedComments(filteredComments);
    setModalOpen(true);
  };

  const processTextWithComments = (text: string): React.ReactNode => {
    if (!text || comments.length === 0) {
      return text;
    }

    // Sort comments by position to avoid conflicts
    const sortedComments = [...comments].sort((a, b) =>
      text.indexOf(a.textSelection) - text.indexOf(b.textSelection)
    );

    let result: React.ReactNode[] = [];
    let lastIndex = 0;

    sortedComments.forEach((comment) => {
      const index = text.indexOf(comment.textSelection, lastIndex);
      if (index !== -1) {
        // Add text before the comment
        if (index > lastIndex) {
          result.push(text.substring(lastIndex, index));
        }

        // Add the commented text as a clickable element
        result.push(
          <span
            key={comment.id + '-' + index}
            className="underline decoration-dotted cursor-pointer transition-all duration-200 hover:opacity-80"
            style={{
              //textDecorationColor: 'rgba(255, 165, 0, 0.8)',
              textUnderlineOffset: '3px',
              //backgroundColor: 'rgba(255, 165, 0, 0.1)'
            }}
            onClick={e => handleCommentClick(e, comment.textSelection)}
          >
            {comment.textSelection}
          </span>
        );

        lastIndex = index + comment.textSelection.length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return result;
  };

  const processChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return processTextWithComments(node)
    }

    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<any>
      
      // Skip processing for Citation and Elaboration components - preserve them as-is
      if (element.type === Citation || element.type === Elaboration) {
        return element
      }
      
      const processedChildren = React.Children.map(element.props.children, processChildren)
      return React.cloneElement(element, {}, processedChildren)
    }

    if (Array.isArray(node)) {
      return node.map(processChildren)
    }

    return node
  }

  // Modal rendering
  return <>
    {processChildren(children)}
    <CommentModal
      open={modalOpen && !!modalPosition}
      onClose={() => setModalOpen(false)}
      comments={selectedComments}
    />
  </>;
}

export default Comments