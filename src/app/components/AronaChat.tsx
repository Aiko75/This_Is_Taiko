import React from "react";
import styles from "../page.module.css";
import { DIALOG_TREE, ARONA_CHAT_SETTINGS } from "../config/dialog";

type AronaChatProps = {
  dialogText: string;
  isTyping: boolean;
  dialogKey: string;
  onSelectOption: (nextNode: string) => void;
};

export default function AronaChat({
  dialogText,
  isTyping,
  dialogKey,
  onSelectOption
}: AronaChatProps) {
  return (
    <>
      <div className={styles.holoHeader}>
        <span>{ARONA_CHAT_SETTINGS.header}</span>
        <div className={styles.holoIndicator}>
          <div className={styles.pingLight} />
          <span>ONLINE</span>
        </div>
      </div>

      <div className={styles.holoBody}>
        <div style={{ width: "100%" }}>
          <h3 className={styles.avatarTitle}>
            <span>{ARONA_CHAT_SETTINGS.title}</span> — {ARONA_CHAT_SETTINGS.status}
          </h3>
          <span className={styles.avatarSub}>{ARONA_CHAT_SETTINGS.sub}</span>
        </div>
        
        <p className={styles.dialogText}>
          {dialogText}
          {isTyping && <span className="caret">|</span>}
        </p>

        <div className={styles.dialogOptions}>
          {DIALOG_TREE[dialogKey]?.options.map((opt, i) => (
            <button
              key={i}
              className={styles.dialogOptButton}
              onClick={() => onSelectOption(opt.nextNode)}
              disabled={isTyping}
              style={{ opacity: isTyping ? 0.6 : 1 }}
            >
              <span>{opt.label}</span>
              <span className={styles.dialogOptIcon}>★</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
