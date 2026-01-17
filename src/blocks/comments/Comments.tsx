import { useState, useEffect } from 'react'
import React from 'react'
import CommentModal from './CommentModal'
import Citation from '../../components/Citation'
import Elaboration from '../../components/Elaboration'
import chapter1Data from '../../data/comments/chapter1.json'
import chapter2Data from '../../data/comments/chapter2.json'
interface CommentData {
  id: string
  textSelection: string
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

interface ChapterCommentsData {
  chapterId: string
  paragraphs: {
    [key: string]: CommentData[]
  }
}

interface CommentsProps {
  paragraphId: string
  children: React.ReactNode
}

// Map paragraph IDs to their chapter numbers
const paragraphToChapter: { [key: string]: number } = {
  para101: 1,
  para146: 1,
  para188: 1,
  para1114: 1,
  // Add more mappings as you create more paragraphs
}

// Map chapter numbers to their data
const chapterDataMap: { [key: number]: ChapterCommentsData } = {
  1: chapter1Data as ChapterCommentsData,
  2: chapter2Data as ChapterCommentsData,
  // Add more chapters as you create them
}

const Comments = ({ paragraphId, children }: CommentsProps) => {
  const [comments, setComments] = useState<CommentData[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState<{top: number, left: number} | null>(null)
  const [selectedComments, setSelectedComments] = useState<CommentData[]>([])

  useEffect(() => {
    // Get the chapter number for this paragraph
    const chapterNumber = paragraphToChapter[paragraphId]
    
    if (!chapterNumber) {
      console.warn(`No chapter mapping found for paragraph: ${paragraphId}`)
      setComments([])
      return
    }

    // Get the chapter data
    const chapterData = chapterDataMap[chapterNumber]
    
    if (!chapterData) {
      console.warn(`No chapter data found for chapter: ${chapterNumber}`)
      setComments([])
      return
    }

    // Get comments for this specific paragraph
    const paragraphComments = chapterData.paragraphs[paragraphId] || []
    console.log(`Loading comments for ${paragraphId}:`, paragraphComments)
    setComments(paragraphComments)
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

  // Extract plain text from React nodes (for matching)
  const extractPlainText = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
      return node;
    }
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{children?: React.ReactNode}>
      if (element.props.children) {
        if (Array.isArray(element.props.children)) {
          return element.props.children.map(extractPlainText).join('');
        }
        return extractPlainText(element.props.children);
      }
      return '';
    }
    if (Array.isArray(node)) {
      return node.map(extractPlainText).join('');
    }
    return '';
  };

  // Apply comment highlighting, skipping Citation and Elaboration components
  const applyCommentHighlight = (node: React.ReactNode, plainText: string, commentTextSelection: string, commentId: string): React.ReactNode => {
    const commentStart = plainText.indexOf(commentTextSelection);
    if (commentStart === -1) return node;
    
    const commentEnd = commentStart + commentTextSelection.length;
    let currentPos = 0;

    const traverse = (n: React.ReactNode): React.ReactNode => {
      if (typeof n === 'string') {
        const nodeStart = currentPos;
        const nodeEnd = currentPos + n.length;
        currentPos += n.length;

        // Check if this string overlaps with comment range
        if (nodeStart < commentEnd && nodeEnd > commentStart) {
          const textStart = Math.max(0, commentStart - nodeStart);
          const textEnd = Math.min(n.length, commentEnd - nodeStart);
          const beforeText = n.substring(0, textStart);
          const commentedText = n.substring(textStart, textEnd);
          const afterText = n.substring(textEnd);

          const result: React.ReactNode[] = [];
          if (beforeText) result.push(beforeText);
          if (commentedText) {
            result.push(
              <span
                key={`comment-${commentId}-${commentStart}`}
                className="underline decoration-dotted cursor-pointer transition-all duration-200 hover:opacity-80 active:opacity-60"
                style={{
                  textUnderlineOffset: '3px',
                }}
                onClick={e => handleCommentClick(e, commentTextSelection)}
              >
                {commentedText}
              </span>
            );
          }
          if (afterText) result.push(afterText);
          return result.length === 1 ? result[0] : result;
        }
        return n;
      }

      if (React.isValidElement(n)) {
        const element = n as React.ReactElement<{children?: React.ReactNode}>
        
        // For Citation and Elaboration, just traverse but don't modify
        // The text inside will be skipped in the plainText calculation
        if (element.type === Citation || element.type === Elaboration) {
          const nodeText = extractPlainText(n);
          currentPos += nodeText.length;
          return n;
        }
        
        const processedChildren = React.Children.map(element.props.children, traverse);
        return React.cloneElement(element, {}, processedChildren);
      }

      if (Array.isArray(n)) {
        return n.map(traverse);
      }

      return n;
    };

    return traverse(node);
  };

  const processChildren = (node: React.ReactNode): React.ReactNode => {
    if (comments.length === 0) {
      return node;
    }

    const plainText = extractPlainText(node);
    
    // Sort comments by position
    const sortedComments = [...comments].sort((a, b) =>
      plainText.indexOf(a.textSelection) - plainText.indexOf(b.textSelection)
    );

    let result = node;
    
    // Apply each comment to the node tree
    sortedComments.forEach((comment) => {
      if (plainText.indexOf(comment.textSelection) !== -1) {
        result = applyCommentHighlight(result, extractPlainText(result), comment.textSelection, comment.id);
      }
    });

    return result;
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