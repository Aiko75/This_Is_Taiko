import React from "react";
import styles from "../page.module.css";

export default function ProfStats() {
  return (
    <div className={`${styles.statCard} glass-panel`}>
      <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
      <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
      <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
      <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

      <div className={styles.statCardHeader}>
        <span className={styles.statCardTitle}>Chỉ Số Năng Lực</span>
        <span className={styles.statLevel}>LV 85</span>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Lập Trình Web (React/Next.js)</span>
          <span className={styles.statVal}>90%</span>
        </div>
        <div className={styles.statProgressOuter}>
          <div className={styles.statProgressInner} style={{ width: "90%" }} />
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>AI, NLP & RAG Systems</span>
          <span className={styles.statVal}>80%</span>
        </div>
        <div className={styles.statProgressOuter}>
          <div className={styles.statProgressInner} style={{ width: "80%" }} />
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Python, Scraping & Database</span>
          <span className={styles.statVal}>85%</span>
        </div>
        <div className={styles.statProgressOuter}>
          <div className={styles.statProgressInner} style={{ width: "85%" }} />
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Nghiên Cứu Học Thuật & NCKH</span>
          <span className={styles.statVal}>85%</span>
        </div>
        <div className={styles.statProgressOuter}>
          <div className={styles.statProgressInner} style={{ width: "85%" }} />
        </div>
      </div>
    </div>
  );
}
