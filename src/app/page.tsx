"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

// Shared Types and Dialogue configs
import { ChatMessage } from "./types";
import { DIALOG_TREE } from "./config/dialog";

// Shared UI components
import AronaHalo from "./components/AronaHalo";
import SkillPopup from "./components/SkillPopup";
import CampaignStage from "./components/CampaignStage";
import MomoTalk from "./components/MomoTalk";
import ProfHUD from "./components/ProfHUD";
import ProfStats from "./components/ProfStats";
import AronaChat from "./components/AronaChat";

export default function Home() {
  const [context, setContext] = useState<"tech" | "otaku">("tech");
  const [isWiping, setIsWiping] = useState(false);
  const [dialogKey, setDialogKey] = useState("start");
  const [dialogText, setDialogText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active student skill modal state (Personal mode)
  const [activeSkill, setActiveSkill] = useState<"ex" | "normal" | "passive" | "sub" | null>(null);

  // Professional CV Contact Form State
  const [profName, setProfName] = useState("");
  const [profEmail, setProfEmail] = useState("");
  const [profMsg, setProfMsg] = useState("");
  const [profFormStatus, setProfFormStatus] = useState("");

  // MomoTalk Message History state (Personal Mode)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
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
  const [momoNameInput, setMomoNameInput] = useState("");
  const [momoEmailInput, setMomoEmailInput] = useState("");
  const [momoMsgInput, setMomoMsgInput] = useState("");
  const [isAronaTyping, setIsAronaTyping] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wipeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Context switch screen-wipe transition
  const handleContextSwitch = () => {
    if (isWiping) return;
    setIsWiping(true);

    wipeTimeoutRef.current = setTimeout(() => {
      setContext((prev) => (prev === "tech" ? "otaku" : "tech"));
    }, 400);

    setTimeout(() => {
      setIsWiping(false);
    }, 800);
  };

  // Dialogue typewriting animation loop
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

  // Interactive node canvas background (Professional Mode - Warm Rose Particles)
  useEffect(() => {
    if (context !== "tech" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 77, 109, 0.35)"; // Warm Crimson Rose particles
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 77, 109, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 77, 109, ${0.2 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [context]);

  // Professional form submission
  const handleProfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profName || !profEmail || !profMsg) {
      setProfFormStatus("Error: Vui lòng điền đầy đủ thông tin!");
      return;
    }
    setProfFormStatus("SENDING");
    setTimeout(() => {
      setProfFormStatus("SUCCESS");
      setProfName("");
      setProfEmail("");
      setProfMsg("");
      setTimeout(() => setProfFormStatus(""), 6000);
    }, 1500);
  };

  // MomoTalk message submission
  const handleMomoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!momoNameInput || !momoEmailInput || !momoMsgInput) {
      alert("Vui lòng điền đầy đủ Tên, Email và lời nhắn của Sensei!");
      return;
    }

    const currentHour = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: `${momoMsgInput} (Tên: ${momoNameInput}, Email: ${momoEmailInput})`,
      time: currentHour
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const sentName = momoNameInput;
    setMomoMsgInput("");
    setIsAronaTyping(true);

    setTimeout(() => {
      const responseHour = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      setIsAronaTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "arona",
          text: `Arona đã tiếp nhận tin nhắn từ Sensei ${sentName} rồi nhé! Em sẽ gửi trực tiếp đến Trần Nhân qua email ngay lập tức. Cảm ơn Sensei đã liên hệ! o(≧▽≦)o`,
          time: responseHour
        }
      ]);
    }, 1500);
  };

  return (
    <div className={`${styles.page} ${context === "tech" ? "tech-theme" : "otaku-theme"}`}>
      {/* Background canvas and grid lines */}
      <div className="background-canvas" />
      <div className="scanlines" />
      <div className={`${styles.canvasWrapper} ${context === "tech" ? "" : "hidden"}`}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      {/* Screen Sweep transition overlay */}
      <div className={`screen-wipe ${isWiping ? "active" : ""}`} />

      {/* Global Header */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.logo} onClick={() => {
            setDialogText("");
            setIsTyping(true);
            setDialogKey("start");
          }}>
            <div className={styles.logoDot} />
            <span className={styles.logoText}>
              {context === "tech" ? "TRANNHAN.DEV" : "SCHALE // AIKO"}
            </span>
          </div>

          <nav>
            <ul className={styles.navList}>
              <li>
                <a href="#about" className={styles.navLink}>
                  {context === "tech" ? "Thông Tin" : "Hồ Sơ"}
                </a>
              </li>
              <li>
                <a href="#projects" className={styles.navLink}>
                  {context === "tech" ? "Dự Án" : "Chiến Dịch"}
                </a>
              </li>
              <li>
                <a href="#skills" className={styles.navLink}>
                  {context === "tech" ? "Kỹ Năng" : "Kỹ Năng Học Viên"}
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.navLink}>
                  {context === "tech" ? "Liên Hệ" : "MomoTalk"}
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.switcherContainer}>
            <span className={styles.switchLabel}>
              {context === "tech" ? "🔬 Professional" : "🎮 Personal"}
            </span>
            <button
              className={styles.switchButton}
              onClick={handleContextSwitch}
              aria-label="Chuyển đổi ngữ cảnh"
            >
              <div
                className={`${styles.switchKnob} ${
                  context === "otaku" ? styles.switchKnobActive : ""
                }`}
              />
              <span className={`${styles.switchIcon} ${styles.switchIconLeft}`} style={{ opacity: context === "tech" ? 1 : 0.4 }}>🔬</span>
              <span className={`${styles.switchIcon} ${styles.switchIconRight}`} style={{ opacity: context === "otaku" ? 1 : 0.4 }}>🎮</span>
            </button>
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

      {/* Mobile nav menu drawer */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.active : ""}`}>
        <ul className={styles.mobileNavList}>
          <li>
            <a href="#about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              {context === "tech" ? "Thông Tin Cá Nhân" : "Hồ Sơ Nhân Vật"}
            </a>
          </li>
          <li>
            <a href="#projects" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              {context === "tech" ? "Dự Án Công Việc" : "Chiến Dịch Game"}
            </a>
          </li>
          <li>
            <a href="#skills" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              {context === "tech" ? "Công Nghệ & Kỹ Năng" : "Bảng Kỹ Năng"}
            </a>
          </li>
          <li>
            <a href="#contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              {context === "tech" ? "Gửi Tín Hiệu Liên Hệ" : "Trò Chuyện MomoTalk"}
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <main className={`${styles.main} container`}>
        
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.tagline}>
              {context === "tech" ? (
                <>
                  <span className={styles.logoDot} /> Professional CV // NCKH Assistant
                </>
              ) : (
                <>🌸 Schale Office // Sensei Level 85</>
              )}
            </div>
            <h1 className={styles.heroTitle}>
              Chào mừng, tôi là <br />
              <span className={styles.accentWord}>Trần Nhân</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {context === "tech"
                ? "Software Engineer & Scientific Research Assistant @ NEU"
                : "🎌 Web Game Developer & Otaku Sensei tận tụy trong Blue Archive"}
            </p>
            <p className={styles.heroBio}>
              {context === "tech"
                ? "Đam mê kết hợp xử lý ngôn ngữ tự nhiên (NLP), Vector Embeddings và hệ thống RAG tìm kiếm ngữ cảnh thông minh. Hiện đang công tác nghiên cứu học thuật tại Trường Công nghệ - Đại học Kinh tế Quốc dân (NEU) song song lập trình ứng dụng Web chuyên nghiệp."
                : "Thích kết hợp các sở thích cá nhân (Anime, Game, Light Novels) vào lập trình thế giới số. Tôi đã xây dựng hệ sinh thái Web Game Aniko để lưu trữ cơ sở dữ liệu wiki riêng tự crawl của mình và phát triển các trò chơi giải đố thú vị."}
            </p>
            <div className={styles.ctas}>
              <a href="#projects" className={styles.btnPrimary}>
                {context === "tech" ? "Xem Dự Án Nghiên Cứu" : "Khám Phá Chiến Dịch"}
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                {context === "tech" ? "Kết Nối Kỹ Sư" : "Trò Chuyện MomoTalk"}
              </a>
            </div>
          </div>

          <div className={styles.visualNovelCard}>
            {context === "otaku" && <AronaHalo />}
            {context === "tech" ? (
              <ProfHUD
                onInitializeContact={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
                }}
                onSwitchContext={handleContextSwitch}
              />
            ) : (
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
            )}
          </div>
        </section>

        {/* PROFILE PROFILE SECTION */}
        <section id="about" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>
              {context === "tech" ? "01 // PROFESSIONAL BIO" : "01 // HỒ SƠ NHÂN VẬT"}
            </span>
            <h2 className={styles.sectionTitle}>
              {context === "tech" ? "Tiểu Sử & Định Hướng Nghiên Cứu" : "Hồ Sơ Sensei"}
            </h2>
          </div>

          <div className={styles.aboutGrid}>
            <div className={styles.bioText}>
              <h3 style={{ fontSize: "1.4rem", color: "var(--accent)", fontWeight: 800 }}>
                {context === "tech"
                  ? "Kỹ sư Phần mềm & Trợ lý Nghiên cứu AI"
                  : "Một Sensei đam mê lập trình game và dịch LN"}
              </h3>
              <p className={styles.bioParagraph}>
                Chào mừng bạn đến với trang portfolio của tôi! Tôi là Trần Nhân, hiện đang làm Trợ lý Nghiên cứu & Phát triển tại **Trường Công nghệ - Đại học Kinh tế Quốc dân (NEU)**. Công việc chính của tôi xoay quanh việc phát triển các thuật toán NLP thông minh, Vector Embeddings và tích hợp mô hình RAG để xử lý dữ liệu nghiên cứu học thuật lớn.
              </p>
              <p className={styles.bioParagraph}>
                Bên cạnh nghiên cứu tại trường, tôi là một lập trình viên nhiệt huyết, thích hiện thực hóa các ý tưởng sáng tạo. Tôi xây dựng dự án cá nhân **Aniko** - một hệ sinh thái Web Game với các game giải đố Anime tự code như Anidle, AniTexto và AniGrid. Tôi cũng thường xuyên biên dịch Light Novels Anh - Việt và tự học tiếng Nhật để nâng cao kỹ năng bản thân.
              </p>
            </div>

            {context === "tech" ? (
              <ProfStats />
            ) : (
              <div className={`${styles.statCard} glass-panel`}>
                <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                <div className={styles.statCardHeader}>
                  <span className={styles.statCardTitle}>Thông Tin Học Viên (Sensei)</span>
                  <span className={styles.statLevel}>LV 85</span>
                </div>

                <div className={styles.baStatsGrid}>
                  <div className={styles.baStatBox}>
                    <span className={styles.baStatLabel}>Vị Trí</span>
                    <span className={styles.baStatVal}>Striker</span>
                  </div>
                  <div className={styles.baStatBox}>
                    <span className={styles.baStatLabel}>Vai Trò</span>
                    <span className={styles.baStatVal}>Attacker</span>
                  </div>
                  <div className={styles.baStatBox}>
                    <span className={styles.baStatLabel}>Trường</span>
                    <span className={styles.baStatVal}>NEU // Schale</span>
                  </div>
                </div>

                <div className={styles.baTerrainRow}>
                  <div className={styles.baTerrainBox}>
                    <span>VS Code (Urban)</span>
                    <span className={styles.baTerrainRank}>S</span>
                  </div>
                  <div className={styles.baTerrainBox}>
                    <span>Terminal (Outdoor)</span>
                    <span className={styles.baTerrainRank}>S</span>
                  </div>
                  <div className={styles.baTerrainBox}>
                    <span>Browser (Indoor)</span>
                    <span className={styles.baTerrainRank}>A</span>
                  </div>
                </div>

                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--foreground-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
                  Bảng kỹ năng cá nhân (Click xem chi tiết):
                </div>

                <div className={styles.baSkillsGrid}>
                  <button className={styles.baSkillBtn} onClick={() => setActiveSkill("ex")}>
                    <div className={styles.baSkillIcon}>EX</div>
                    <span className={styles.baSkillName}>Aniko Game</span>
                  </button>
                  <button className={styles.baSkillBtn} onClick={() => setActiveSkill("normal")}>
                    <div className={styles.baSkillIcon}>NM</div>
                    <span className={styles.baSkillName}>Dịch LN</span>
                  </button>
                  <button className={styles.baSkillBtn} onClick={() => setActiveSkill("passive")}>
                    <div className={styles.baSkillIcon}>PS</div>
                    <span className={styles.baSkillName}>Tiếng Nhật</span>
                  </button>
                  <button className={styles.baSkillBtn} onClick={() => setActiveSkill("sub")}>
                    <div className={styles.baSkillIcon}>SB</div>
                    <span className={styles.baSkillName}>Crawl DB</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SKILLS DETAIL OVERLAY POPUP */}
        {activeSkill && (
          <SkillPopup
            activeSkill={activeSkill}
            onClose={() => setActiveSkill(null)}
          />
        )}

        {/* PROJECTS SECTION */}
        <section id="projects" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>
              {context === "tech" ? "02 // ECOSYSTEM PROJECTS" : "02 // CHIẾN DỊCH KHAI PHÁ"}
            </span>
            <h2 className={styles.sectionTitle}>
              {context === "tech" ? "Dự Án Nghiên Cứu & Phát Triển" : "Nhiệm Vụ Chiến Dịch"}
            </h2>
          </div>

          <div className={styles.projectsGrid}>
            {context === "tech" ? (
              <>
                <div className={`${styles.projectCard} glass-panel glow-hover`}>
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                  <div className={styles.projectIconWrapper}>🎮</div>
                  <h3 className={styles.projectTitle}>Aniko</h3>
                  <p className={styles.projectDesc}>
                    Hệ sinh thái Web Game và Cơ sở dữ liệu Anime/Manga tổng hợp. Chứa các trò chơi mini giải đố trí tuệ kết nối cộng đồng otaku, sử dụng các thuật toán chuẩn hóa dữ liệu tự động crawl.
                  </p>
                  <div className={styles.projectTags}>
                    <span className={styles.projectTag}>React.js</span>
                    <span className={styles.projectTag}>JavaScript</span>
                    <span className={styles.projectTag}>Python Crawler</span>
                    <span className={styles.projectTag}>Database Design</span>
                  </div>
                  <a
                    href="https://github.com/Aiko75/Aniko"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.projectLink}
                  >
                    <span>Xem mã nguồn dự án trên GitHub</span>
                    <span>➔</span>
                  </a>
                </div>

                <div className={`${styles.projectCard} glass-panel glow-hover`}>
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                  <div className={styles.projectIconWrapper}>🔬</div>
                  <h3 className={styles.projectTitle}>NEU Paper Classifier & RAG</h3>
                  <p className={styles.projectDesc}>
                    Dự án nghiên cứu xây dựng hệ thống tự động phân loại các bài viết học thuật tại NEU dựa trên NLP. Kết hợp Vector Database và Small LLMs để truy xuất thông tin, hỗ trợ sinh viên nghiên cứu.
                  </p>
                  <div className={styles.projectTags}>
                    <span className={styles.projectTag}>Python</span>
                    <span className={styles.projectTag}>NLP</span>
                    <span className={styles.projectTag}>ChromaDB</span>
                    <span className={styles.projectTag}>RAG Model</span>
                  </div>
                  <span className={styles.projectLink} style={{ color: "var(--foreground-muted)", cursor: "default" }}>
                    <span>Nghiên cứu học thuật đang tiến hành</span>
                    <span>🔒</span>
                  </span>
                </div>

                <div className={`${styles.projectCard} glass-panel glow-hover`}>
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                  <div className={styles.projectIconWrapper}>🔄</div>
                  <h3 className={styles.projectTitle}>Context-Aware Switcher</h3>
                  <p className={styles.projectDesc}>
                    Hệ thống chuyển đổi ngữ cảnh giao diện thông minh sử dụng React Context API kết hợp dynamic CSS Variables, cho phép thay đổi dữ liệu và bộ style tương thích tức thì.
                  </p>
                  <div className={styles.projectTags}>
                    <span className={styles.projectTag}>Next.js</span>
                    <span className={styles.projectTag}>React Context</span>
                    <span className={styles.projectTag}>CSS Variables</span>
                  </div>
                  <span className={styles.projectLink} style={{ color: "var(--foreground-muted)", cursor: "default" }}>
                    <span>Tích hợp trực tiếp trong Aniko</span>
                    <span>🔒</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <CampaignStage
                  area="AREA 1-1 // STRIKER"
                  title="Aniko Game Center"
                  stars={3}
                  desc="Cổng game mini giải đố Anime: Anidle, AniTexto... sử dụng hệ cơ sở dữ liệu anime tự xây dựng."
                  drops={[
                    { icon: "⚛️", name: "React.js" },
                    { icon: "🕸️", name: "Crawler" },
                    { icon: "🎨", name: "Vanilla CSS" }
                  ]}
                  actionLabel="START TASK"
                  actionUrl="https://github.com/Aiko75/Aniko"
                />
                
                <CampaignStage
                  area="AREA 1-2 // CAMPAIGN"
                  title="NEU Document Classifier & RAG"
                  stars={2}
                  desc="Thuật toán tự động phân loại văn bản học thuật NEU và gợi ý tài liệu thông minh dựa trên ngữ cảnh Vector."
                  drops={[
                    { icon: "🐍", name: "Python" },
                    { icon: "🧠", name: "NLP Model" },
                    { icon: "📁", name: "Vector DB" }
                  ]}
                  actionLabel="RESEARCHING"
                  badgeColor="var(--accent-secondary)"
                  isActive={false}
                />

                <CampaignStage
                  area="AREA 1-3 // SUPPORT"
                  title="Context Switcher System"
                  stars={3}
                  desc="Hệ thống chuyển đổi theme/data động dựa trên React Context API giúp cá nhân hóa cấu trúc website."
                  drops={[
                    { icon: "🌐", name: "Next.js" },
                    { icon: "⚡", name: "React Context" }
                  ]}
                  actionLabel="ACTIVE IN SYSTEM"
                  isActive={true}
                />
              </>
            )}
          </div>
        </section>

        {/* SKILLS MAP & TIMELINE SECTION */}
        <section id="skills" className={styles.section}>
          <div className={styles.skillsSectionGrid}>
            <div>
              <div className={styles.sectionTitleContainer}>
                <span className={styles.sectionPre}>03 // KNOWLEDGE & TECH STACK</span>
                <h2 className={styles.sectionTitle}>Bản Đồ Công Nghệ</h2>
              </div>
              <div className={styles.skillsColumn}>
                <div>
                  <h4 className={styles.skillsTitle}>🌐 Lập Trình Frontend</h4>
                  <div className={styles.skillPillContainer}>
                    <span className={styles.skillPill}>HTML5 / CSS3</span>
                    <span className={styles.skillPill}>JavaScript (ES6+)</span>
                    <span className={styles.skillPill}>TypeScript</span>
                    <span className={styles.skillPill}>React.js</span>
                    <span className={styles.skillPill}>Next.js</span>
                    <span className={styles.skillPill}>Responsive Design</span>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <h4 className={styles.skillsTitle}>⚙️ Backend & AI Research</h4>
                  <div className={styles.skillPillContainer}>
                    <span className={styles.skillPill}>Node.js / Express</span>
                    <span className={styles.skillPill}>Python</span>
                    <span className={styles.skillPill}>FastAPI</span>
                    <span className={styles.skillPill}>NLP Algorithms</span>
                    <span className={styles.skillPill}>Vector Database (Chroma)</span>
                    <span className={styles.skillPill}>RAG Pipelines</span>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <h4 className={styles.skillsTitle}>🎓 Kỹ Năng Hỗ Trợ</h4>
                  <div className={styles.skillPillContainer}>
                    <span className={styles.skillPill}>Git / GitHub</span>
                    <span className={styles.skillPill}>Web Scraping (BeautifulSoup/Playwright)</span>
                    <span className={styles.skillPill}>SQLite / PostgreSQL</span>
                    <span className={styles.skillPill}>English translation</span>
                    <span className={styles.skillPill}>Japanese Basic (Tự học N4)</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.sectionTitleContainer}>
                <span className={styles.sectionPre}>04 // NEU RESEARCH CHRONICLE</span>
                <h2 className={styles.sectionTitle}>
                  {context === "tech" ? "Hoạt Động Nghiên Cứu" : "Nhật Ký Lịch Sử"}
                </h2>
              </div>
              <div className={styles.timeline}>
                <div className={`${styles.timelineItem} glass-panel`}>
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>Trợ lý Nghiên cứu Khoa học & NLP</h3>
                    <span className={styles.timelinePeriod}>Hiện tại</span>
                  </div>
                  <div className={styles.timelineSub}>
                    Trường Công nghệ - Đại học Kinh tế Quốc dân (NEU)
                  </div>
                  <p className={styles.timelineContent}>
                    Phát triển và triển khai hệ thống phân loại bài viết khoa học bằng xử lý ngôn ngữ tự nhiên (NLP). Xây dựng cấu trúc cơ sở dữ liệu Vector để tối ưu khả năng tìm kiếm ngữ cảnh (RAG), hỗ trợ các đề tài nghiên cứu của trường.
                  </p>
                </div>

                <div className={`${styles.timelineItem} glass-panel`}>
                  <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                  <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>Crawl & Xây dựng Database Wiki</h3>
                    <span className={styles.timelinePeriod}>2025 - 2026</span>
                  </div>
                  <div className={styles.timelineSub}>Hệ Cơ sở dữ liệu Anime tự động</div>
                  <p className={styles.timelineContent}>
                    Viết các công cụ crawler thu thập lượng lớn dữ liệu Anime/Manga từ các fandom wiki lớn. Thiết kế hệ thống làm sạch và chuẩn hóa dữ liệu quan hệ cục bộ phục vụ các minigame cá nhân.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>05 // COMMUNICATIONS</span>
            <h2 className={styles.sectionTitle}>
              {context === "tech" ? "Gửi Tín Hiệu Liên Hệ" : "Kênh Trò Chuyện MomoTalk"}
            </h2>
          </div>

          <div className={styles.contactGrid}>
            <div className={`${styles.contactInfoCard} glass-panel`}>
              <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
              <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
              <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
              <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

              <div className={styles.contactIntro}>
                <h3 style={{ fontSize: "1.3rem", color: "var(--accent)", fontWeight: 800 }}>
                  {context === "tech" ? "Gửi Thông Điệp" : "Văn Phòng Trực Thuộc"}
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

            {context === "tech" ? (
              <div className={`${styles.formCard} glass-panel`}>
                <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

                <form onSubmit={handleProfSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="profName">Tên người gửi / Tổ chức</label>
                    <input
                      type="text"
                      id="profName"
                      className={styles.inputField}
                      placeholder="Nhập tên của bạn..."
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup} style={{ marginTop: "12px" }}>
                    <label htmlFor="profEmail">Địa chỉ Email liên hệ</label>
                    <input
                      type="email"
                      id="profEmail"
                      className={styles.inputField}
                      placeholder="email@example.com"
                      value={profEmail}
                      onChange={(e) => setProfEmail(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup} style={{ marginTop: "12px" }}>
                    <label htmlFor="profMsg">Nội dung tin nhắn</label>
                    <textarea
                      id="profMsg"
                      className={styles.textareaField}
                      placeholder="Nhập nội dung đề xuất hoặc câu hỏi của bạn..."
                      value={profMsg}
                      onChange={(e) => setProfMsg(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.btnPrimary}
                    style={{ width: "100%", marginTop: "16px" }}
                    disabled={profFormStatus === "SENDING"}
                  >
                    {profFormStatus === "SENDING" ? "Đang xử lý gói tin..." : "Gửi Tin Nhắn"}
                  </button>

                  {profFormStatus === "SUCCESS" && (
                    <div className={styles.terminalFeedback}>
                      [SYSTEM_LOG]: Khởi tạo SMTP thành công.
                      <br />
                      [SYSTEM_LOG]: Truyền phát gói tin thành công đến Trần Nhân. Cảm ơn bạn!
                    </div>
                  )}

                  {profFormStatus.startsWith("Error") && (
                    <div className={styles.terminalFeedback} style={{ color: "#ff4d4d", borderColor: "rgba(255, 77, 77, 0.3)" }}>
                      [SYSTEM_ERROR]: {profFormStatus}
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <MomoTalk
                chatMessages={chatMessages}
                momoNameInput={momoNameInput}
                setMomoNameInput={setMomoNameInput}
                momoEmailInput={momoEmailInput}
                setMomoEmailInput={setMomoEmailInput}
                momoMsgInput={momoMsgInput}
                setMomoMsgInput={setMomoMsgInput}
                isAronaTyping={isAronaTyping}
                onSubmit={handleMomoSubmit}
              />
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className="container">
          <p>© 2026 Trần Nhân (Aiko75). Designed with 🤍 in Next.js & Pure CSS.</p>
          <p style={{ fontSize: "0.75rem", marginTop: "8px", opacity: 0.6 }}>
            {context === "tech"
              ? "STATUS: COGNITIVE DECOUPLING MODULE ACTIVE"
              : "STATUS: ARONA IS EATING STRAWBERRY CAKE ON SCHALE COUCH"}
          </p>
        </div>
      </footer>
    </div>
  );
}
