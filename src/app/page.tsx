"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";

// Components
import BackgroundCanvas from "./components/BackgroundCanvas";
import Header from "./components/Header";
import HeroSection, { HeroRef } from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogSection from "./components/BlogSection";
import SkillsSection from "./components/SkillsSection";
import CredentialsSection from "./components/CredentialsSection";
import CustomBlocksSection from "./components/CustomBlocksSection";
import ContactSection from "./components/ContactSection";

// Popups
import SkillPopup from "./components/SkillPopup";
import BlogPopup from "./components/BlogPopup";

export default function Home() {
  const [activeSkill, setActiveSkill] = useState<any | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any | null>(null);
  
  const heroRef = useRef<HeroRef | null>(null);

  const handleLogoClick = () => {
    if (heroRef.current) {
      heroRef.current.resetArona();
    }
  };

  return (
    <div className={styles.page}>
      <BackgroundCanvas />
      <div className="background-canvas" />
      <div className="scanlines" />

      <Header onLogoClick={handleLogoClick} />

      <main className={`${styles.main} container`}>
        <HeroSection ref={heroRef} />
        <AboutSection onSelectSkill={setActiveSkill} />
        <ProjectsSection />
        <BlogSection onSelectPost={setSelectedBlogPost} />
        <SkillsSection />
        <CredentialsSection />
        <CustomBlocksSection />
        <ContactSection />
      </main>

      {activeSkill && (
        <SkillPopup skillDetails={activeSkill} onClose={() => setActiveSkill(null)} />
      )}

      {selectedBlogPost && (
        <BlogPopup post={selectedBlogPost} onClose={() => setSelectedBlogPost(null)} />
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Trần Nhân. Thiết kế lấy cảm hứng từ Schale & Blue Archive.</p>
      </footer>
    </div>
  );
}
