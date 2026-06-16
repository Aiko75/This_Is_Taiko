"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

interface BlogSectionProps {
  onSelectPost: (post: any) => void;
}

export default function BlogSection({ onSelectPost }: BlogSectionProps) {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  // Load blog posts từ API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("/api/blog");
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải nhật ký:", error);
      }
    };
    fetchBlog();
  }, []);

  return (
    <section id="blog" className={styles.section}>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionPre}>03 // CHRONICLES & UPDATES</span>
        <h2 className={styles.sectionTitle}>Nhật Ký & Hoạt Động</h2>
      </div>

      {blogPosts.length === 0 ? (
        <div className="glass-panel" style={{ padding: "30px", textAlign: "center", color: "var(--foreground-muted)" }}>
          <span>Đang tải danh sách bài viết hoặc chưa có bài viết nào...</span>
        </div>
      ) : (
        <div className={styles.projectsGrid}>
          {blogPosts.map((post, idx) => {
            const postDate = new Date(post.date).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            return (
              <div 
                key={idx} 
                className={`${styles.projectCard} glass-panel`} 
                style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}
              >
                <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                
                <div>
                  {post.image && (
                    <div style={{ 
                      width: "100%", 
                      height: "150px", 
                      overflow: "hidden", 
                      borderRadius: "6px", 
                      marginBottom: "12px", 
                      border: "1px solid rgba(255, 77, 109, 0.15)" 
                    }}>
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    </div>
                  )}
                  <div style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 800, marginBottom: "6px" }}>
                    📅 {postDate}
                  </div>
                  <h3 
                    className={styles.projectTitle} 
                    style={{ fontSize: "1.05rem", marginBottom: "8px", lineBreak: "anywhere" }}
                  >
                    {post.title}
                  </h3>
                  <p 
                    className={styles.projectDesc} 
                    style={{ 
                      fontSize: "0.85rem", 
                      opacity: 0.85, 
                      marginBottom: "16px", 
                      lineClamp: 3, 
                      display: "-webkit-box", 
                      WebkitLineClamp: 3, 
                      WebkitBoxOrient: "vertical", 
                      overflow: "hidden" 
                    }}
                  >
                    {post.summary}
                  </p>
                </div>

                <button 
                  className={styles.projectBtn} 
                  onClick={() => onSelectPost(post)}
                  style={{ marginTop: "auto", width: "100%", textAlign: "center", display: "block" }}
                >
                  <span>XEM CHI TIẾT BÀI ĐĂNG</span>
                  <span className={styles.projectBtnIcon}>&gt;</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
