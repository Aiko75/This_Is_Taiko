"use client";

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import styles from "../page.module.css";
import { DIALOG_TREE } from "../config/dialog";
import profileData from "../config/profile.json";

// Components
import AronaHalo from "./AronaHalo";
import AronaChat from "./AronaChat";
import ProfHUD from "./ProfHUD";

export interface HeroRef {
  resetArona: () => void;
}

const HeroSection = forwardRef<HeroRef, {}>((props, ref) => {
  const [activeHeroTab, setActiveHeroTab] = useState<"arona" | "hud">("arona");
  const [dialogKey, setDialogKey] = useState("start");
  const [dialogText, setDialogText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useImperativeHandle(ref, () => ({
    resetArona() {
      setDialogText("");
      setIsTyping(true);
      setDialogKey("start");
    }
  }));

  // Hiệu ứng chữ chạy cho hội thoại Arona
  useEffect(() => {
    const textToType = DIALOG_TREE[dialogKey]?.text || "";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < textToType.length) {
        setDialogText((prev) => prev + textToType.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [dialogKey]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.tagline}>
          <span className={styles.logoDot} /> {profileData.affiliation} {"// Kinh nghiệm: "} {profileData.experience}
        </div>
        <h1 className={styles.heroTitle}>
          Chào mừng, tôi là <br />
          <span className={styles.accentWord}>{profileData.name}</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {profileData.title}
        </p>
        <p className={styles.heroBio}>
          {profileData.bio}
        </p>
        <div className={styles.ctas}>
          <a href="#projects" className={styles.btnPrimary}>Khám Phá Dự Án</a>
          <a href="#contact" className={styles.btnSecondary}>Kết Nối Với Tôi</a>
        </div>
      </div>

      <div className={styles.visualNovelCard}>
        {activeHeroTab === "arona" && <AronaHalo />}
        <div className={`${styles.holoFrame} glass-panel`}>
          <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

          {/* Tabs chuyển đổi trên HUD */}
          <div className={styles.heroTabs}>
            <button
              className={`${styles.heroTabBtn} ${activeHeroTab === "arona" ? styles.heroTabBtnActive : ""}`}
              onClick={() => setActiveHeroTab("arona")}
            >
              🌸 Trợ lý Arona
            </button>
            <button
              className={`${styles.heroTabBtn} ${activeHeroTab === "hud" ? styles.heroTabBtnActive : ""}`}
              onClick={() => setActiveHeroTab("hud")}
            >
              💻 Chẩn Đoán Hệ Thống
            </button>
          </div>

          {activeHeroTab === "arona" ? (
            <AronaChat
              dialogText={dialogText}
              isTyping={isTyping}
              dialogKey={dialogKey}
              onSelectOption={(nextNode) => {
                setDialogText("");
                setIsTyping(true);
                setDialogKey(nextNode);
              }}
            />
          ) : (
            <ProfHUD
              onInitializeContact={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
