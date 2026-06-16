"use client";

import styles from "../page.module.css";
import profileData from "../config/profile.json";
import ChatMarkdown from "./ChatMarkdown";

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.skillsSectionGrid}>
        <div>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>04 // KNOWLEDGE & TECH STACK</span>
            <h2 className={styles.sectionTitle}>Bản Đồ Công Nghệ</h2>
          </div>
          <div className={styles.skillsColumn}>
            {profileData.techStack.map((stack, idx) => (
              <div key={idx} style={idx > 0 ? { marginTop: "16px" } : undefined}>
                <h4 className={styles.skillsTitle}>{stack.category}</h4>
                <div className={styles.skillPillContainer}>
                  {stack.items.map((item, itemIdx) => (
                    <span key={itemIdx} className={styles.skillPill}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>05 // NEU RESEARCH CHRONICLE</span>
            <h2 className={styles.sectionTitle}>Hoạt Động & Lịch Sử</h2>
          </div>
          <div className={styles.timeline}>
            {profileData.timeline.map((event, idx) => (
              <div key={idx} className={`${styles.timelineItem} glass-panel`}>
                <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                <div className={styles.timelineHeader}>
                  <h3 className={styles.timelineTitle}>{event.title}</h3>
                  <span className={styles.timelinePeriod}>{event.period}</span>
                </div>
                <div className={styles.timelineSub}>{event.sub}</div>
                <div className={styles.timelineContent}>
                  <ChatMarkdown text={event.desc} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
