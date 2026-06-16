import React from "react";
import styles from "../page.module.css";

type BlogPopupProps = {
  post: {
    title: string;
    date: string;
    image?: string;
    summary: string;
    body: string;
  };
  onClose: () => void;
};

export default function BlogPopup({ post, onClose }: BlogPopupProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.skillPopupOverlay} onClick={onClose}>
      <div 
        className={`${styles.skillPopupCard} glass-panel`} 
        style={{ maxWidth: "680px", width: "90%" }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

        <div className={styles.skillPopupHeader}>
          <span className={styles.skillPopupTitle} style={{ fontSize: "1.2rem", fontWeight: 800 }}>
            {post.title}
          </span>
          <button className={styles.skillPopupClose} onClick={onClose}>✕</button>
        </div>

        <div 
          className={styles.skillPopupBody} 
          style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "8px" }}
        >
          <div style={{ 
            display: "flex", 
            gap: "8px", 
            alignItems: "center", 
            fontSize: "0.8rem", 
            color: "var(--accent)", 
            fontWeight: 800, 
            marginBottom: "12px", 
            textTransform: "uppercase" 
          }}>
            <span>📅 {formattedDate}</span>
          </div>

          {post.image && (
            <img 
              src={post.image} 
              alt={post.title} 
              style={{ 
                width: "100%", 
                maxHeight: "260px", 
                objectFit: "cover", 
                borderRadius: "6px", 
                marginBottom: "16px", 
                border: "1px solid rgba(255, 77, 109, 0.2)" 
              }} 
            />
          )}

          <p style={{ 
            fontStyle: "italic", 
            color: "var(--foreground-muted)", 
            marginBottom: "16px", 
            borderLeft: "3px solid var(--accent)", 
            paddingLeft: "12px", 
            lineHeight: 1.6 
          }}>
            {post.summary}
          </p>

          <div style={{ 
            whiteSpace: "pre-wrap", 
            color: "var(--foreground)", 
            lineHeight: 1.8, 
            fontSize: "0.95rem" 
          }}>
            {post.body}
          </div>
        </div>
      </div>
    </div>
  );
}
