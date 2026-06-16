"use client";

import { useState } from "react";
import styles from "../page.module.css";
import MomoTalk, { type ResponseMode } from "./MomoTalk";
import { ChatMessage } from "../types";

export default function ContactSection() {
  const [activePartner, setActivePartner] = useState<"arona" | "plana">("arona");
  
  const [aronaMessages, setAronaMessages] = useState<ChatMessage[]>( [
    {
      id: 1,
      sender: "arona",
      text: "Xin chào Sensei! Em là Arona, trợ lý đắc lực của Sensei Trần Nhân đây! 🌸",
      time: "21:54"
    },
    {
      id: 2,
      sender: "arona",
      text: "Sensei có thể gửi thông điệp kết nối ở ô bên dưới nhé. Em sẽ lưu tin nhắn và báo trực tiếp cho Trần Nhân ngay lập tức ạ! (★ω★)/",
      time: "21:55"
    }
  ]);

  const [planaMessages, setPlanaMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "plana",
      text: "Báo cáo Sensei. Tôi là Plana, hệ điều hành hỗ trợ thứ hai tại Schale. ⚙️",
      time: "21:54"
    },
    {
      id: 2,
      sender: "plana",
      text: "Hệ thống đã kết nối trực tiếp với cơ sở dữ liệu của Trần Nhân. Sensei có thể hỏi bất kỳ thông tin nào, tôi sẽ trả lời một cách chính xác và máy móc nhất.",
      time: "21:55"
    }
  ]);

  const [momoMsgInput, setMomoMsgInput] = useState("");
  const [isAronaTyping, setIsAronaTyping] = useState(false);
  const [isMomoExpanded, setIsMomoExpanded] = useState(false);
  const [responseMode, setResponseMode] = useState<ResponseMode>("concise");

  const handleToggleMomoExpand = () => {
    setIsMomoExpanded((prev) => {
      const nextExpanded = !prev;
      setResponseMode(nextExpanded ? "detailed" : "concise");
      return nextExpanded;
    });
  };

  const handleMomoSubmit = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const messageText = directText || momoMsgInput;
    if (!messageText.trim()) return;

    const currentHour = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText.trim(),
      time: currentHour
    };

    const activeMessages = activePartner === "arona" ? aronaMessages : planaMessages;
    const setActiveMessages = activePartner === "arona" ? setAronaMessages : setPlanaMessages;

    const updatedMessages = [...activeMessages, userMsg];
    setActiveMessages(updatedMessages);
    setMomoMsgInput("");
    setIsAronaTyping(true);

    const triggerMomoFallback = () => {
      setTimeout(() => {
        const responseHour = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        setIsAronaTyping(false);
        const fallbackText = activePartner === "plana"
          ? "Báo cáo: Hệ thống đã ghi nhận thông điệp gửi đến Trần Nhân. Lịch sử liên kết đã được lưu trữ thành công. Cảm ơn. ⚙️"
          : "Arona đã tiếp nhận tin nhắn rồi nhé! Em sẽ báo lại cho Trần Nhân ngay lập tức. Cảm ơn đã liên hệ! o(≧▽≦)o";
        setActiveMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: activePartner,
            text: fallbackText,
            time: responseHour
          }
        ]);
      }, 1500);
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          messages: updatedMessages, 
          responseMode,
          partner: activePartner
        })
      });

      if (!response.ok) {
        throw new Error("API chưa sẵn sàng hoặc gặp lỗi.");
      }

      const data = await response.json();
      const responseHour = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      setIsAronaTyping(false);
      setActiveMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: activePartner,
          text: data.reply,
          time: responseHour
        }
      ]);
    } catch (error) {
      console.warn("AI Chat Error, falling back to mock reply:", error);
      triggerMomoFallback();
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionPre}>08 // COMMUNICATIONS</span>
        <h2 className={styles.sectionTitle}>Kênh Kết Nối MomoTalk & Email</h2>
      </div>

      <div className={styles.contactGrid}>
        <div className={`${styles.contactInfoCard} glass-panel`}>
          <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

          <div className={styles.contactIntro}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--accent)", fontWeight: 800 }}>
              Gửi Thông Điệp
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--foreground-muted)" }}>
              Tôi luôn sẵn lòng trao đổi về lập trình web game, các nghiên cứu NLP/RAG tại NEU, hoặc đàm đạo về Anime và Light Novels!
            </p>
          </div>

          <div className={styles.contactDetails}>
            <a
              href="mailto:trannhan07052005@gmail.com"
              className={styles.contactLinkItem}
              title="Gửi Email trực tiếp"
            >
              <div className={styles.contactIcon}>✉</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--foreground-muted)" }}>EMAIL HỆ THỐNG</div>
                <div>trannhan07052005@gmail.com</div>
              </div>
            </a>

            <a
              href="https://github.com/Aiko75"
              target="_blank"
              rel="noreferrer"
              className={styles.contactLinkItem}
              title="Ghé thăm GitHub"
            >
              <div className={styles.contactIcon}>🐙</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--foreground-muted)" }}>GITHUB PROFILE</div>
                <div>github.com/Aiko75</div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/thongminh.conga.73/"
              target="_blank"
              rel="noreferrer"
              className={styles.contactLinkItem}
              title="Kết nối Facebook"
            >
              <div className={styles.contactIcon}>📘</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--foreground-muted)" }}>FACEBOOK CÁ NHÂN</div>
                <div>thongminh.conga.73</div>
              </div>
            </a>

            <a
              href="https://www.youtube.com/@Nhako7525"
              target="_blank"
              rel="noreferrer"
              className={styles.contactLinkItem}
              title="Ghé thăm Youtube"
            >
              <div className={styles.contactIcon}>▶</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--foreground-muted)" }}>YOUTUBE CHANNEL</div>
                <div>@Nhako7525</div>
              </div>
            </a>
          </div>
        </div>

        {/* Cửa sổ chat MomoTalk hiển thị song song */}
        <MomoTalk
          chatMessages={activePartner === "arona" ? aronaMessages : planaMessages}
          momoMsgInput={momoMsgInput}
          setMomoMsgInput={setMomoMsgInput}
          isAronaTyping={isAronaTyping}
          onSubmit={handleMomoSubmit}
          isExpanded={isMomoExpanded}
          onToggleExpand={handleToggleMomoExpand}
          responseMode={responseMode}
          onSetResponseMode={setResponseMode}
          activePartner={activePartner}
          onSetPartner={setActivePartner}
        />
      </div>
    </section>
  );
}
