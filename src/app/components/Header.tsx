"use client";

import { useState } from "react";
import styles from "../page.module.css";

interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.logo} onClick={onLogoClick}>
            <div className={styles.logoDot} />
            <span className={styles.logoText}>TRANNHAN.DEV</span>
          </div>

          <nav>
            <ul className={styles.navList}>
              <li>
                <a href="#about" className={styles.navLink}>Thông Tin</a>
              </li>
              <li>
                <a href="#projects" className={styles.navLink}>Dự Án</a>
              </li>
              <li>
                <a href="#blog" className={styles.navLink}>Nhật Ký</a>
              </li>
              <li>
                <a href="#credentials" className={styles.navLink}>Học Vấn</a>
              </li>
              <li>
                <a href="#skills" className={styles.navLink}>Kỹ Năng</a>
              </li>
              <li>
                <a href="#contact" className={styles.navLink}>Liên Hệ</a>
              </li>
            </ul>
          </nav>

          <div>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.active : ""}`}>
        <ul className={styles.mobileNavList}>
          <li>
            <a href="#about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Thông Tin</a>
          </li>
          <li>
            <a href="#projects" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Dự Án</a>
          </li>
          <li>
            <a href="#blog" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Nhật Ký</a>
          </li>
          <li>
            <a href="#credentials" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Học Vấn</a>
          </li>
          <li>
            <a href="#skills" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Kỹ Năng</a>
          </li>
          <li>
            <a href="#contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Liên Hệ</a>
          </li>
        </ul>
      </div>
    </>
  );
}
