import React, { useRef, useEffect } from "react";
import styles from "../page.module.css";
import { ChatMessage } from "../types";
import { AronaAvatarSvg, SenseiIconSvg } from "./Icons";

type MomoTalkProps = {
  chatMessages: ChatMessage[];
  momoNameInput: string;
  setMomoNameInput: (v: string) => void;
  momoEmailInput: string;
  setMomoEmailInput: (v: string) => void;
  momoMsgInput: string;
  setMomoMsgInput: (v: string) => void;
  isAronaTyping: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export default function MomoTalk({
  chatMessages,
  momoNameInput,
  setMomoNameInput,
  momoEmailInput,
  setMomoEmailInput,
  momoMsgInput,
  setMomoMsgInput,
  isAronaTyping,
  onSubmit
}: MomoTalkProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isAronaTyping]);

  return (
    <div className={styles.momoTalkContainer}>
      {/* Sidebar */}
      <div className={styles.momoSidebar}>
        <div className={styles.momoSidebarHeader}>Hội Thoại</div>
        <div className={styles.momoSidebarList}>
          <div className={`${styles.momoSidebarItem} ${styles.momoSidebarItemActive}`}>
            <AronaAvatarSvg />
            <div className={styles.momoSidebarText}>
              <span className={styles.momoSidebarName}>Arona</span>
              <span className={`${styles.momoSidebarStatus} ${styles.momoSidebarStatusActive}`}>Online</span>
            </div>
          </div>
          <div className={styles.momoSidebarItem}>
            <div className={styles.momoAvatarWrapper}>
              <SenseiIconSvg />
            </div>
            <div className={styles.momoSidebarText}>
              <span className={styles.momoSidebarName}>Trần Nhân</span>
              <span className={styles.momoSidebarStatus}>Offline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className={styles.momoChatArea}>
        <div className={styles.momoChatHeader}>
          <span className={styles.momoChatTitle}>Trò chuyện với Arona</span>
          <div className={styles.momoChatHeaderStatus}>
            <div className={styles.pingLight} />
            <span>ARONA_OS_v1.5</span>
          </div>
        </div>

        {/* Chat Feed */}
        <div className={styles.momoChatFeed}>
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.momoMsgBubble} ${
                msg.sender === "arona" ? styles.momoAronaBubble : styles.momoUserBubble
              }`}
            >
              <div className={styles.momoAvatarWrapper}>
                {msg.sender === "arona" ? <AronaAvatarSvg /> : <SenseiIconSvg />}
              </div>
              <div className={styles.momoMsgBody}>
                <span className={styles.momoMsgSender}>
                  {msg.sender === "arona" ? "Arona" : "Sensei (User)"}
                </span>
                <div className={styles.momoMsgBubbleBox}>
                  {msg.text}
                </div>
              </div>
              <span className={styles.momoMsgTime}>{msg.time}</span>
            </div>
          ))}

          {/* Arona typing bubble */}
          {isAronaTyping && (
            <div className={`${styles.momoMsgBubble} ${styles.momoAronaBubble}`}>
              <div className={styles.momoAvatarWrapper}>
                <AronaAvatarSvg />
              </div>
              <div className={styles.momoMsgBody}>
                <span className={styles.momoMsgSender}>Arona</span>
                <div className={styles.momoMsgBubbleBox} style={{ fontStyle: "italic", opacity: 0.8 }}>
                  Arona đang gõ...
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Form Compose input fields */}
        <div className={styles.momoInputArea}>
          <form onSubmit={onSubmit} className={styles.momoInputForm}>
            <div className={styles.momoFormFields}>
              <input
                type="text"
                className={styles.momoInputMini}
                placeholder="Tên Sensei..."
                value={momoNameInput}
                onChange={(e) => setMomoNameInput(e.target.value)}
              />
              <input
                type="email"
                className={styles.momoInputMini}
                placeholder="Email của Sensei..."
                value={momoEmailInput}
                onChange={(e) => setMomoEmailInput(e.target.value)}
              />
            </div>
            <div className={styles.momoTextComposeRow}>
              <textarea
                className={styles.momoComposeField}
                placeholder="Gửi tin nhắn MomoTalk..."
                value={momoMsgInput}
                onChange={(e) => setMomoMsgInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                className={styles.momoSendBtn}
                disabled={isAronaTyping || !momoMsgInput.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
