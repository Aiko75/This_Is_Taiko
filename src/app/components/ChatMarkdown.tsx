import React from "react";
import styles from "../page.module.css";

/**
 * Component render markdown đơn giản cho tin nhắn chat.
 * Hỗ trợ: **bold**, *italic*, xuống dòng, danh sách có đánh số và gạch đầu dòng.
 * Không dùng thư viện ngoài để giữ bundle nhẹ.
 */
export default function ChatMarkdown({ text }: { text: string }) {
  // Tách text thành các đoạn bằng dấu xuống dòng kép (paragraph)
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className={styles.chatMarkdown}>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Kiểm tra xem đoạn này có phải danh sách không
        const lines = trimmed.split("\n");
        const isUnorderedList = lines.every(
          (l) => /^\s*[-•]\s+/.test(l) || !l.trim()
        );
        const isOrderedList = lines.every(
          (l) => /^\s*\d+[.)]\s+/.test(l) || !l.trim()
        );

        if (isUnorderedList && lines.some((l) => l.trim())) {
          return (
            <ul key={pIdx} className={styles.chatMdList}>
              {lines
                .filter((l) => l.trim())
                .map((l, i) => (
                  <li key={i}>
                    <InlineMarkdown text={l.replace(/^\s*[-•]\s+/, "")} />
                  </li>
                ))}
            </ul>
          );
        }

        if (isOrderedList && lines.some((l) => l.trim())) {
          return (
            <ol key={pIdx} className={styles.chatMdList}>
              {lines
                .filter((l) => l.trim())
                .map((l, i) => (
                  <li key={i}>
                    <InlineMarkdown text={l.replace(/^\s*\d+[.)]\s+/, "")} />
                  </li>
                ))}
            </ol>
          );
        }

        // Đoạn văn bản thường - xử lý xuống dòng đơn bằng <br/>
        return (
          <p key={pIdx} className={styles.chatMdPara}>
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                <InlineMarkdown text={line} />
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/** Xử lý inline markdown: **bold**, *italic* */
function InlineMarkdown({ text }: { text: string }) {
  // Regex: tìm **bold** hoặc *italic*
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Phần text trước match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      parts.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[3]) {
      // *italic*
      parts.push(<em key={match.index}>{match[3]}</em>);
    }

    lastIndex = regex.lastIndex;
  }

  // Phần text còn lại
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
