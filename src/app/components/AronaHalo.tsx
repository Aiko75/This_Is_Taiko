import React from "react";
import styles from "../page.module.css";

export default function AronaHalo() {
  return (
    <div className={`${styles.baHalo} halo`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: "absolute", top: 0, left: 0 }}>
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="var(--accent)" strokeWidth="1" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeDasharray="8 4" />
        <path d="M 50 4 Q 56 12 50 20 Q 44 12 50 4 Z" fill="var(--accent)" />
        <path d="M 50 96 Q 56 88 50 80 Q 44 88 50 96 Z" fill="var(--accent)" />
        <text x="47" y="53" fill="var(--accent-secondary)" fontSize="10" fontWeight="bold">★</text>
      </svg>
    </div>
  );
}
