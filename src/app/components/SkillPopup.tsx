import React from "react";
import styles from "../page.module.css";

type SkillPopupProps = {
  skillDetails: {
    title: string;
    desc: string;
  };
  onClose: () => void;
};

export default function SkillPopup({ skillDetails, onClose }: SkillPopupProps) {
  return (
    <div className={styles.skillPopupOverlay} onClick={onClose}>
      <div 
        className={`${styles.skillPopupCard} glass-panel`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

        <div className={styles.skillPopupHeader}>
          <span className={styles.skillPopupTitle}>{skillDetails.title}</span>
          <button className={styles.skillPopupClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.skillPopupBody}>
          <p className={styles.skillPopupDesc} style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
            {skillDetails.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
