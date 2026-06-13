import React from "react";
import styles from "../page.module.css";

// Custom SVG Arona Chibi Avatar
export function AronaAvatarSvg() {
  return (
    <svg viewBox="0 0 100 100" className={styles.aronaAvatarSvg} style={{ width: "34px", height: "34px" }}>
      <circle cx="50" cy="50" r="46" fill="#00a6ff" stroke="#ffffff" strokeWidth="3" />
      <path d="M 15,45 Q 25,20 50,20 Q 75,20 85,45 C 80,65 75,75 50,75 C 25,75 20,65 15,45 Z" fill="#b0e0e6" />
      <path d="M 20,40 Q 30,15 50,15 Q 70,15 80,40 Q 82,55 70,68 C 65,72 55,75 50,75 C 45,75 35,72 30,68 Q 18,55 20,40 Z" fill="#87cefa" />
      <circle cx="50" cy="52" r="24" fill="#fff0e5" />
      <path d="M 30,42 Q 40,48 45,55 Q 48,45 50,42 Q 52,45 55,55 Q 60,48 70,42 Q 74,38 72,32 C 65,22 35,22 28,32 Q 26,38 30,42 Z" fill="#87cefa" />
      <ellipse cx="43" cy="52" rx="3" ry="5" fill="#2c3e50" />
      <ellipse cx="57" cy="52" rx="3" ry="5" fill="#2c3e50" />
      <circle cx="39" cy="57" r="2" fill="#ff6b95" opacity="0.6" />
      <circle cx="61" cy="57" r="2" fill="#ff6b95" opacity="0.6" />
      <path d="M 48,58 Q 50,60 52,58" fill="none" stroke="#2c3e50" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="24" y="24" width="12" height="12" rx="2" fill="#ff6b95" transform="rotate(15 30 30)" />
      <polygon points="22,22 28,15 32,24" fill="#ffffff" transform="rotate(15 30 30)" />
    </svg>
  );
}

// Custom SVG User/Sensei icon
export function SenseiIconSvg() {
  return (
    <svg viewBox="0 0 100 100" style={{ width: "24px", height: "24px" }}>
      <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="3" />
      <circle cx="50" cy="38" r="16" fill="var(--accent)" />
      <path d="M 22,78 C 22,60 35,56 50,56 C 65,56 78,60 78,78" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// Custom SVG Plana Chibi Avatar ( काउंटरपार्ट/Counterpart to Arona in BA)
export function PlanaAvatarSvg() {
  return (
    <svg viewBox="0 0 100 100" style={{ width: "34px", height: "34px" }}>
      <circle cx="50" cy="50" r="46" fill="#352f38" stroke="#ffffff" strokeWidth="3" />
      <path d="M 15,45 Q 25,20 50,20 Q 75,20 85,45 C 80,65 75,75 50,75 C 25,75 20,65 15,45 Z" fill="#e5e0e3" />
      <path d="M 20,40 Q 30,15 50,15 Q 70,15 80,40 Q 82,55 70,68 C 65,72 55,75 50,75 C 45,75 35,72 30,68 Q 18,55 20,40 Z" fill="#d2cbd0" />
      <circle cx="50" cy="52" r="24" fill="#fff0e5" />
      <path d="M 30,42 Q 40,48 45,55 Q 48,45 50,42 Q 52,45 55,55 Q 60,48 70,42 Q 74,38 72,32 C 65,22 35,22 28,32 Q 26,38 30,42 Z" fill="#d2cbd0" />
      <ellipse cx="43" cy="52" rx="3" ry="5" fill="#2c3e50" />
      <ellipse cx="57" cy="52" rx="3" ry="5" fill="#2c3e50" />
      <circle cx="39" cy="57" r="2" fill="#ff6b95" opacity="0.6" />
      <circle cx="61" cy="57" r="2" fill="#ff6b95" opacity="0.6" />
      <path d="M 48,58 Q 50,60 52,58" fill="none" stroke="#2c3e50" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="24" y="24" width="12" height="12" rx="2" fill="#ff4d6d" transform="rotate(15 30 30)" />
      <polygon points="22,22 28,15 32,24" fill="#ffffff" transform="rotate(15 30 30)" />
    </svg>
  );
}
