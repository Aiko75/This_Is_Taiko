import React, { useRef, useEffect } from "react";
import styles from "../page.module.css";
import { ChatMessage } from "../types";
import { AronaAvatarSvg, SenseiIconSvg, PlanaAvatarSvg } from "./Icons";
import ChatMarkdown from "./ChatMarkdown";

export type ResponseMode = "concise" | "detailed";

const SUGGESTED_QUESTIONS = [
  "Trần Nhân đang nghiên cứu và công tác ở đâu?",
  "Hãy giới thiệu các dự án nổi bật của Trần Nhân",
  "Các kỹ năng và dự án trọng tâm của Trần Nhân là gì?",
  "Làm thế nào để liên hệ với Trần Nhân?"
];

type MomoTalkProps = {
  chatMessages: ChatMessage[];
  momoMsgInput: string;
  setMomoMsgInput: (v: string) => void;
  isAronaTyping: boolean;
  onSubmit: (e?: React.FormEvent, directText?: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  responseMode: ResponseMode;
  onSetResponseMode: (mode: ResponseMode) => void;
  activePartner: "arona" | "plana";
  onSetPartner: (partner: "arona" | "plana") => void;
};

export default function MomoTalk({
  chatMessages,
  momoMsgInput,
  setMomoMsgInput,
  isAronaTyping,
  onSubmit,
  isExpanded,
  onToggleExpand,
  responseMode,
  onSetResponseMode,
  activePartner,
  onSetPartner
}: MomoTalkProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isAronaTyping]);

  return (
    <>
      {/* Backdrop overlay khi mở rộng */}
      {isExpanded && (
        <div className={styles.momoBackdrop} onClick={onToggleExpand} />
      )}

      <div
        className={`${styles.momoTalkContainer} ${
          isExpanded ? styles.momoExpanded : ""
        }`}
      >
        {/* Sidebar */}
        <div className={styles.momoSidebar}>
          <div className={styles.momoSidebarHeader}>Hội Thoại</div>
          <div className={styles.momoSidebarList}>
            {/* Arona Option */}
            <div
              className={`${styles.momoSidebarItem} ${
                activePartner === "arona" ? styles.momoSidebarItemActive : ""
              }`}
              onClick={() => onSetPartner("arona")}
            >
              <AronaAvatarSvg />
              <div className={styles.momoSidebarText}>
                <span className={styles.momoSidebarName}>Arona</span>
                <span
                  className={`${styles.momoSidebarStatus} ${
                    activePartner === "arona" ? styles.momoSidebarStatusActive : ""
                  }`}
                >
                  Online
                </span>
              </div>
            </div>

            {/* Plana Option */}
            <div
              className={`${styles.momoSidebarItem} ${
                activePartner === "plana" ? styles.momoSidebarItemActive : ""
              }`}
              onClick={() => onSetPartner("plana")}
            >
              <PlanaAvatarSvg />
              <div className={styles.momoSidebarText}>
                <span className={styles.momoSidebarName}>Plana</span>
                <span
                  className={`${styles.momoSidebarStatus} ${
                    activePartner === "plana" ? styles.momoSidebarStatusActive : ""
                  }`}
                >
                  Online
                </span>
              </div>
            </div>

            {/* Trần Nhân (Offline) */}
            <div
              className={styles.momoSidebarItem}
              onClick={() =>
                alert(
                  "Báo cáo: Trần Nhân hiện đang bận nghiên cứu khoa học và lập trình web. Vui lòng gửi tin nhắn cho Arona hoặc Plana để chuyển tiếp thông điệp. ⚙️"
                )
              }
            >
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
            <span className={styles.momoChatTitle}>
              Trò chuyện với {activePartner === "arona" ? "Arona" : "Plana"}
            </span>
            <div className={styles.momoChatHeaderActions}>
              <div className={styles.momoChatHeaderStatus}>
                <div className={styles.pingLight} />
                <span>ARONA_OS_v1.5</span>
              </div>
              {/* Nút phóng to / thu nhỏ */}
              <button
                className={styles.momoExpandBtn}
                onClick={onToggleExpand}
                title={isExpanded ? "Thu nhỏ" : "Phóng to"}
              >
                {isExpanded ? "⊖" : "⊕"}
              </button>
            </div>
          </div>

          {/* Chat Feed */}
          <div className={styles.momoChatFeed}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.momoMsgBubble} ${
                  msg.sender === "arona"
                    ? styles.momoAronaBubble
                    : msg.sender === "plana"
                    ? styles.momoPlanaBubble
                    : styles.momoUserBubble
                }`}
              >
                <div className={styles.momoAvatarWrapper}>
                  {msg.sender === "arona" ? (
                    <AronaAvatarSvg />
                  ) : msg.sender === "plana" ? (
                    <PlanaAvatarSvg />
                  ) : (
                    <SenseiIconSvg />
                  )}
                </div>
                <div className={styles.momoMsgBody}>
                  <span className={styles.momoMsgSender}>
                    {msg.sender === "arona"
                      ? "Arona"
                      : msg.sender === "plana"
                      ? "Plana"
                      : "Sensei (User)"}
                  </span>
                  <div className={styles.momoMsgBubbleBox}>
                    {msg.sender === "arona" || msg.sender === "plana" ? (
                      <ChatMarkdown text={msg.text} />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
                <span className={styles.momoMsgTime}>{msg.time}</span>
              </div>
            ))}

            {/* Arona / Plana typing bubble */}
            {isAronaTyping && (
              <div
                className={`${styles.momoMsgBubble} ${
                  activePartner === "arona" ? styles.momoAronaBubble : styles.momoPlanaBubble
                }`}
              >
                <div className={styles.momoAvatarWrapper}>
                  {activePartner === "arona" ? <AronaAvatarSvg /> : <PlanaAvatarSvg />}
                </div>
                <div className={styles.momoMsgBody}>
                  <span className={styles.momoMsgSender}>
                    {activePartner === "arona" ? "Arona" : "Plana"}
                  </span>
                  <div
                    className={styles.momoMsgBubbleBox}
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    {activePartner === "arona" ? "Arona" : "Plana"} đang gõ...
                  </div>
                </div>
              </div>
            )}

            {/* Câu hỏi đề xuất kiểu NotebookLM */}
            {!isAronaTyping && (
              <div className={styles.momoSuggestions}>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.momoSuggestionChip}
                    onClick={() => onSubmit(undefined, q)}
                  >
                    {activePartner === "arona" ? "🌸" : "⚙️"} {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Compose input fields */}
          <div className={styles.momoInputArea}>
            {/* Chế độ trả lời */}
            <div className={styles.momoModeRow}>
              <span className={styles.momoModeLabel}>Chế độ:</span>
              <button
                className={`${styles.momoModeBtn} ${
                  responseMode === "concise" ? styles.momoModeBtnActive : ""
                }`}
                onClick={() => onSetResponseMode("concise")}
                type="button"
              >
                ⚡ Ngắn gọn
              </button>
              <button
                className={`${styles.momoModeBtn} ${
                  responseMode === "detailed" ? styles.momoModeBtnActive : ""
                }`}
                onClick={() => onSetResponseMode("detailed")}
                type="button"
              >
                📝 Đầy đủ
              </button>
            </div>

            <form onSubmit={onSubmit} className={styles.momoInputForm}>
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
    </>
  );
}
