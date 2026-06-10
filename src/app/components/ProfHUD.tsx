import React from "react";
import styles from "../page.module.css";

type ProfHUDProps = {
  onInitializeContact: () => void;
  onSwitchContext: () => void;
};

export default function ProfHUD({ onInitializeContact, onSwitchContext }: ProfHUDProps) {
  return (
    <div className={`${styles.holoFrame} glass-panel`}>
      <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
      <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
      <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
      <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

      <div className={styles.holoHeader}>
        <span>SYSTEM_HUD_INTELLIGENCE_V1.5</span>
        <div className={styles.holoIndicator}>
          <div className={styles.pingLight} />
          <span>ONLINE</span>
        </div>
      </div>

      <div className={styles.holoBody}>
        <div style={{ width: "100%" }}>
          <h3 className={styles.avatarTitle}>
            <span>💻</span> Trần Nhân | System.env
          </h3>
          <span className={styles.avatarSub}>Cấu hình kỹ sư & Trợ lý NCKH</span>
        </div>
        
        <div className={styles.dialogText}>
          <code style={{ fontSize: "0.82rem", color: "var(--accent-secondary)", lineHeight: 1.5 }}>
            $ cat trannhan.json
            <br />
            {`{`}
            <br />
            &nbsp;&nbsp;{`"position": "Research Assistant & SE",`}
            <br />
            &nbsp;&nbsp;{`"workplace": "National Economics University",`}
            <br />
            &nbsp;&nbsp;{`"research": ["NLP", "Vector Embeddings", "RAG"],`}
            <br />
            &nbsp;&nbsp;{`"languages": ["TypeScript", "Python", "SQL"]`}
            <br />
            {`}`}
          </code>
        </div>

        <div className={styles.dialogOptions}>
          <button
            className={styles.dialogOptButton}
            onClick={onInitializeContact}
          >
            <span>🚀 Khởi động truyền tin liên hệ</span>
            <span className={styles.dialogOptIcon}>&gt;</span>
          </button>
          <button className={styles.dialogOptButton} onClick={onSwitchContext}>
            <span>🎮 Chuyển đổi sang Hồ Sơ Cá Nhân</span>
            <span className={styles.dialogOptIcon}>&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
