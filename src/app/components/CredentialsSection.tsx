"use client";

import styles from "../page.module.css";
import profileData from "../config/profile.json";

export default function CredentialsSection() {
  return (
    <section id="credentials" className={styles.section}>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionPre}>06 // CREDENTIALS & ACADEMICS</span>
        <h2 className={styles.sectionTitle}>Học Vấn & Chứng Chỉ</h2>
      </div>

      <div className={styles.skillsSectionGrid}>
        {/* Học vấn */}
        <div className="glass-panel" style={{ padding: "24px", position: "relative" }}>
          <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
          
          <h3 style={{ fontSize: "1.15rem", color: "var(--accent)", fontWeight: 800, marginBottom: "16px", textTransform: "uppercase" }}>
            🎓 Quá Trình Học Tập
          </h3>
          
          {((profileData as any).education || []).map((edu: any, idx: number) => (
            <div 
              key={idx} 
              style={{ 
                marginBottom: idx < (profileData as any).education.length - 1 ? "20px" : "0", 
                borderBottom: idx < (profileData as any).education.length - 1 ? "1px dashed rgba(255, 77, 109, 0.2)" : "none", 
                paddingBottom: idx < (profileData as any).education.length - 1 ? "16px" : "0" 
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                <h4 style={{ fontSize: "1.02rem", fontWeight: 800, color: "var(--foreground)" }}>{edu.school}</h4>
                <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700 }}>{edu.period}</span>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.88rem", color: "var(--foreground-muted)", fontWeight: 700 }}>{edu.degree}</span>
                {edu.gpa && (
                  <span style={{ 
                    fontSize: "0.75rem", 
                    background: "rgba(255, 77, 109, 0.15)", 
                    color: "var(--accent)", 
                    padding: "2px 6px", 
                    borderRadius: "4px", 
                    fontWeight: 800 
                  }}>
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>
              {edu.details && <p style={{ fontSize: "0.85rem", lineHeight: 1.6, opacity: 0.85 }}>{edu.details}</p>}
            </div>
          ))}
        </div>

        {/* Chứng chỉ */}
        <div className="glass-panel" style={{ padding: "24px", position: "relative" }}>
          <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
          <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
          
          <h3 style={{ fontSize: "1.15rem", color: "var(--accent)", fontWeight: 800, marginBottom: "16px", textTransform: "uppercase" }}>
            📜 Chứng Chỉ & Giải Thưởng
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {((profileData as any).certificates || []).map((cert: any, idx: number) => (
              <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {cert.image ? (
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    style={{ 
                      width: "45px", 
                      height: "45px", 
                      borderRadius: "4px", 
                      objectFit: "cover", 
                      border: "1px solid rgba(255, 77, 109, 0.2)" 
                    }} 
                  />
                ) : (
                  <div style={{ 
                    width: "45px", 
                    height: "45px", 
                    borderRadius: "4px", 
                    background: "rgba(255, 77, 109, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    border: "1px dashed var(--accent)", 
                    fontSize: "1.2rem" 
                  }}>
                    🥇
                  </div>
                )}
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--foreground)", marginBottom: "2px" }}>
                    {cert.title}
                  </h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)" }}>
                    <span>{cert.issuer}</span> • <span style={{ color: "var(--accent)", fontWeight: 700 }}>{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
