"use client";

import styles from "../page.module.css";
import profileData from "../config/profile.json";

export default function CustomBlocksSection() {
  const blocks = (profileData as any).customBlocks || [];
  if (blocks.length === 0) return null;

  return (
    <section id="custom-sections" className={styles.section}>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionPre}>07 // CUSTOM BLOCKS & NOTES</span>
        <h2 className={styles.sectionTitle}>Khối Nội Dung Tùy Biến</h2>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {blocks.map((block: any, idx: number) => {
          switch (block.type) {
            case "textBlock":
              return (
                <div key={idx} className="glass-panel" style={{ padding: "24px", position: "relative" }}>
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                  {block.title && (
                    <h3 style={{ 
                      fontSize: "1.15rem", 
                      color: "var(--accent)", 
                      fontWeight: 800, 
                      marginBottom: "12px", 
                      textTransform: "uppercase" 
                    }}>
                      {block.title}
                    </h3>
                  )}
                  <div style={{ lineHeight: 1.7, opacity: 0.9, whiteSpace: "pre-wrap", fontSize: "0.92rem" }}>
                    {block.content}
                  </div>
                </div>
              );
            case "imageBlock":
              return (
                <div key={idx} className="glass-panel" style={{ padding: "24px", position: "relative", textAlign: "center" }}>
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                  {block.title && (
                    <h3 style={{ 
                      fontSize: "1.15rem", 
                      color: "var(--accent)", 
                      fontWeight: 800, 
                      marginBottom: "12px", 
                      textTransform: "uppercase", 
                      textAlign: "left" 
                    }}>
                      {block.title}
                    </h3>
                  )}
                  <img 
                    src={block.image} 
                    alt={block.title || "Custom Image"} 
                    style={{ 
                      maxWidth: "100%", 
                      maxHeight: "360px", 
                      objectFit: "contain", 
                      borderRadius: "6px", 
                      border: "1px solid rgba(255, 77, 109, 0.2)", 
                      marginTop: "8px" 
                    }} 
                  />
                  {block.caption && (
                    <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "10px", fontStyle: "italic" }}>
                      {block.caption}
                    </p>
                  )}
                </div>
              );
            case "quoteBlock":
              return (
                <div 
                  key={idx} 
                  className="glass-panel" 
                  style={{ 
                    padding: "24px 28px", 
                    position: "relative", 
                    borderLeft: "4px solid var(--accent)", 
                    fontStyle: "italic", 
                    background: "rgba(255, 77, 109, 0.02)" 
                  }}
                >
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                  <p style={{ fontSize: "1.08rem", lineHeight: 1.6, marginBottom: "8px", color: "var(--foreground)" }}>
                    "{block.quote}"
                  </p>
                  {block.author && (
                    <p style={{ 
                      textAlign: "right", 
                      fontWeight: 800, 
                      color: "var(--accent)", 
                      fontSize: "0.9rem", 
                      textTransform: "uppercase" 
                    }}>
                      — {block.author}
                    </p>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
}
