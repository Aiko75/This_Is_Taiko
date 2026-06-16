"use client";

import styles from "../page.module.css";
import profileData from "../config/profile.json";
import ChatMarkdown from "./ChatMarkdown";

interface AboutSectionProps {
  onSelectSkill: (skill: any) => void;
}

export default function AboutSection({ onSelectSkill }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionPre}>{(profileData as any).aboutSectionPre || "01 // PERSONAL PROFILE"}</span>
        <h2 className={styles.sectionTitle}>{(profileData as any).aboutSectionTitle || "Hồ Sơ Cá Nhân & Tiểu Sử"}</h2>
      </div>

      <div className={styles.aboutGrid}>
        <div className={styles.bioText}>
          <h3 style={{ fontSize: "1.4rem", color: "var(--accent)", fontWeight: 800 }}>
            {(profileData as any).aboutTitle || "Kỹ sư Phần mềm & Trợ lý Nghiên cứu AI"}
          </h3>
          <div className={styles.bioParagraph} style={{ marginTop: "16px" }}>
            <ChatMarkdown text={(profileData as any).aboutLong || ""} />
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

          {/* Header Hồ sơ với Avatar */}
          <div className={styles.statCardHeader} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            {profileData.avatar ? (
              <img 
                src={profileData.avatar} 
                alt={profileData.name} 
                style={{ 
                  width: "60px", 
                  height: "60px", 
                  borderRadius: "50%", 
                  objectFit: "cover", 
                  border: "2px solid var(--accent)",
                  boxShadow: "0 0 10px rgba(255, 77, 109, 0.3)"
                }} 
              />
            ) : (
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "rgba(255, 77, 109, 0.1)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "1.5rem",
                border: "2px dashed var(--accent)"
              }}>
                💻
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={styles.statCardTitle} style={{ fontSize: "1.25rem", color: "var(--foreground)" }}>
                Thông Tin Chuyên Môn
              </span>
              <span className={styles.statLevel} style={{ fontSize: "0.85rem", color: "#ffffff", alignSelf: "flex-start", marginTop: "2px" }}>
                {profileData.experience} Kinh nghiệm
              </span>
            </div>
          </div>

          <div className={styles.baStatsGrid}>
            <div className={styles.baStatBox}>
              <span className={styles.baStatLabel}>Định Hướng</span>
              <span className={styles.baStatVal} style={{ fontSize: "0.85rem", fontWeight: 700 }}>{profileData.target}</span>
            </div>
            <div className={styles.baStatBox}>
              <span className={styles.baStatLabel}>Chuyên Môn</span>
              <span className={styles.baStatVal} style={{ fontSize: "0.85rem", fontWeight: 700 }}>{profileData.specialization}</span>
            </div>
            <div className={styles.baStatBox}>
              <span className={styles.baStatLabel}>Đơn Vị</span>
              <span className={styles.baStatVal} style={{ fontSize: "0.85rem", fontWeight: 700 }}>{profileData.affiliation}</span>
            </div>
          </div>

          <div className={styles.baTerrainRow} style={{ marginTop: "12px", marginBottom: "16px" }}>
            {profileData.tools.map((t, idx) => (
              <div key={idx} className={styles.baTerrainBox}>
                <span>{t.name}</span>
                <span className={styles.baTerrainRank} style={{ fontSize: "0.75rem", padding: "2px 6px", textTransform: "none" }}>
                  {t.level}
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--foreground-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Dự án & Kỹ năng trọng tâm (Click xem):
          </div>

          <div className={styles.baSkillsGrid}>
            {((profileData as any).highlights || []).map((highlight: any, idx: number) => (
              <button key={idx} className={styles.baSkillBtn} onClick={() => onSelectSkill(highlight)}>
                <div className={styles.baSkillIcon} style={{ background: "rgba(255, 77, 109, 0.2)", color: "var(--accent)" }}>
                  {highlight.categoryShort || "SKILL"}
                </div>
                <span className={styles.baSkillName}>{highlight.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
