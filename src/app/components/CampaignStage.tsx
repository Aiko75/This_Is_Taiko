import React from "react";
import styles from "../page.module.css";

type CampaignStageProps = {
  area: string;
  title: string;
  stars: number;
  desc: string;
  badgeColor?: string;
  drops: { icon: string; name: string }[];
  actionLabel: string;
  actionUrl?: string;
  isActive?: boolean;
};

export default function CampaignStage({
  area,
  title,
  stars,
  desc,
  badgeColor,
  drops,
  actionLabel,
  actionUrl,
  isActive = true
}: CampaignStageProps) {
  return (
    <div className={`${styles.campaignCard} glass-panel`}>
      <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
      <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
      <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
      <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

      <span 
        className={styles.stageBadge} 
        style={badgeColor ? { backgroundColor: badgeColor } : undefined}
      >
        {area}
      </span>
      <h3 className={styles.stageTitle}>{title}</h3>
      
      <div className={styles.stageStars}>
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>⭐</span>
        ))}
      </div>
      
      <p className={styles.projectDesc}>{desc}</p>
      
      <span className={styles.stageDropsTitle}>Công nghệ sử dụng:</span>
      <div className={styles.stageDropsGrid}>
        {drops.map((drop, i) => (
          <div key={i} className={styles.dropSlot}>
            <span className={styles.dropSlotIcon}>{drop.icon}</span>
            <span className={styles.dropTooltip}>{drop.name}</span>
          </div>
        ))}
      </div>

      {actionUrl ? (
        <a
          href={actionUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.stageButton}
        >
          <span>{actionLabel}</span>
          <span>➔</span>
        </a>
      ) : (
        <button 
          className={styles.stageButton} 
          style={!isActive ? { backgroundColor: "#9ca3af", cursor: "not-allowed", boxShadow: "none" } : { backgroundColor: "var(--accent)", boxShadow: "0 3px 10px var(--accent-glow-strong)" }} 
          disabled={!isActive}
        >
          <span>{actionLabel}</span>
          <span>{isActive ? "✔" : "🔒"}</span>
        </button>
      )}
    </div>
  );
}
