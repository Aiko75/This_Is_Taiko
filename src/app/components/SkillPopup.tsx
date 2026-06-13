import React from "react";
import styles from "../page.module.css";

type SkillPopupProps = {
  skillDetails: {
    name: string;
    type: string;
    desc: string;
    upgrade: string;
  };
  onClose: () => void;
};

export default function SkillPopup({ skillDetails, onClose }: SkillPopupProps) {
  return (
    <div className={styles.skillPopupOverlay} onClick={onClose}>
      <div className={`${styles.skillPopupCard} glass-panel`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

        <div className={styles.skillPopupHeader}>
          <span className={styles.skillPopupTitle}>{skillDetails.name}</span>
          <button className={styles.skillPopupClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.skillPopupBody}>
          <span className={styles.skillPopupType}>{skillDetails.type}</span>
          <p className={styles.skillPopupDesc}>{skillDetails.desc}</p>
          <div className={styles.skillPopupUpgrade}>
            <strong>Level Up Info:</strong> {skillDetails.upgrade}
          </div>
        </div>
      </div>
    </div>
  );
}
