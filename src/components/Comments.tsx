import { useState, useEffect } from 'react'
import React from 'react'
import InfoBox from './InfoBox'
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
  const [openCommentId, setOpenCommentId] = useState<string | null>(null)

  useEffect(() => {
    // Load comments for this paragraph
    const paragraphComments = (commentsData as any)[`${paragraphId}_comments`] || []
    setComments(paragraphComments)
  }, [paragraphId])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderCommentContent = (comment: CommentData) => {
    return (
      <div className="max-w-sm">
        <div className="mb-3">
          <div className="font-medium text-sm mb-1" style={{ color: 'var(--theme-text)' }}>
            选中文本: "{comment.textSelection}"
          </div>
          <div className="text-sm mb-2 leading-relaxed">
            {comment.comment}
          </div>
          <div className="flex justify-between items-center text-xs" style={{ color: 'var(--theme-border)' }}>
            <span>{comment.author}</span>
            <span>{formatTimestamp(comment.timestamp)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--theme-border)' }}>
            <span>👍 {comment.likes}</span>
            {comment.replies.length > 0 && (
              <span>💬 {comment.replies.length} 回复</span>
            )}
          </div>
        </div>
        
        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--theme-border)' }}>
            <div className="text-xs mb-2 font-medium" style={{ color: 'var(--theme-text)' }}>
              回复:
            </div>
            {comment.replies.map((reply) => (
              <div key={reply.id} className="mb-2 p-2 rounded" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <div className="text-sm mb-1">{reply.comment}</div>
                <div className="flex justify-between items-center text-xs" style={{ color: 'var(--theme-border)' }}>
                  <span>{reply.author}</span>
                  <span>👍 {reply.likes}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const processTextWithComments = (text: string): React.ReactNode => {
    if (!text || comments.length === 0) {
      return text
    }

    // Sort comments by position to avoid conflicts
    const sortedComments = [...comments].sort((a, b) => 
      text.indexOf(a.textSelection) - text.indexOf(b.textSelection)
    )

    let result: React.ReactNode[] = []
    let lastIndex = 0

    sortedComments.forEach((comment) => {
      const index = text.indexOf(comment.textSelection, lastIndex)
      if (index !== -1) {
        // Add text before the comment
        if (index > lastIndex) {
          result.push(text.substring(lastIndex, index))
        }

        // Add the commented text as a clickable element
        result.push(
          <InfoBox
            key={comment.id}
            trigger={
              <span
                className="underline decoration-dotted cursor-pointer transition-all duration-200 hover:opacity-80"
                style={{
                  textDecorationColor: 'rgba(255, 165, 0, 0.8)',
                  textUnderlineOffset: '3px',
                  backgroundColor: 'rgba(255, 165, 0, 0.1)'
                }}
              >
                {comment.textSelection}
              </span>
            }
            title="💬 用户评论"
            content=""
            isOpen={openCommentId === comment.id}
            onToggle={() => setOpenCommentId(openCommentId === comment.id ? null : comment.id)}
            onClose={() => setOpenCommentId(null)}
            customContent={renderCommentContent(comment)}
          />
        )

        lastIndex = index + comment.textSelection.length
      }
    })

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex))
    }

    return result
  }

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

  return <>{processChildren(children)}</>
}

export default Comments