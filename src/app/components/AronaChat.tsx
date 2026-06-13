import React from "react";
import styles from "../page.module.css";
import { DIALOG_TREE } from "../config/dialog";

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
        <span>A.R.O.N.A OS CONNECTED</span>
        <div className={styles.holoIndicator}>
          <div className={styles.pingLight} />
          <span>ONLINE</span>
        </div>
      </div>

      <div className={styles.holoBody}>
        <div style={{ width: "100%" }}>
          <h3 className={styles.avatarTitle}>
            <span>Arona</span> — Hỗ Trợ Đắc Lực
          </h3>
          <span className={styles.avatarSub}>Hệ điều hành Schale OS v1.5</span>
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
