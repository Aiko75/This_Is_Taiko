"use client";

import styles from "../page.module.css";
import projectsData from "../config/projects.json";
import CampaignStage from "./CampaignStage";

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionPre}>02 // ECOSYSTEM PROJECTS</span>
        <h2 className={styles.sectionTitle}>Các Chiến Dịch & Dự Án Sáng Tạo</h2>
      </div>

      <div className={styles.projectsGrid}>
        {projectsData.projects.map((project) => (
          <CampaignStage
            key={project.id}
            area={project.area}
            title={project.title}
            stars={project.stars}
            desc={project.desc}
            drops={project.drops}
            actionLabel={project.actionLabel}
            actionUrl={project.url || undefined}
            isActive={project.isActive}
          />
        ))}
      </div>
    </section>
  );
}
