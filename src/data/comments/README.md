# Comments Data Structure

## Overview
Comments are organized by chapter for better performance and maintainability.

## File Structure
```
comments/
  chapter1.json  # Comments for paragraphs para101-para199
  chapter2.json  # Comments for paragraphs para201-para299
  chapter3.json  # Comments for paragraphs para301-para399
  ...
  chapter12.json # Comments for paragraphs para1201-para1299
```

## Data Format
Each chapter file follows this structure:

```json
{
  "chapterId": "chapter1",
  "paragraphs": {
    "para101": [
      {
        "id": "comment_001",
        "textSelection": "被评论的文本",
        "startOffset": 30,
        "endOffset": 36,
        "comment": "评论内容",
        "author": "作者名",
        "timestamp": "2026-01-08T14:30:00Z",
        "likes": 5,
        "replies": [
          {
            "id": "reply_001",
            "comment": "回复内容",
            "author": "回复者",
            "timestamp": "2026-01-09T10:20:00Z",
            "likes": 3
          }
        ]
      }
    ],
    "para102": [...],
    "para103": [...]
  }
}
```

## Adding New Comments

1. Determine which chapter the paragraph belongs to (para101-199 = chapter1, para201-299 = chapter2, etc.)
2. Open the corresponding `chapterX.json` file
3. Add or update the paragraph's comments array
4. Replies should be nested directly within the parent comment's `replies` array

## Benefits
- ✅ **Lazy loading** - Only loads comments for the current chapter
- ✅ **Better performance** - Smaller file sizes per chapter
- ✅ **Easy maintenance** - Comments organized logically by chapter
- ✅ **Scalable** - Can handle many paragraphs per chapter without performance issues
