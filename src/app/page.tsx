"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

// Type definitions for the Arona dialogue branching system
type DialogNode = {
  text: string;
  options: {
    label: string;
    nextNode: string;
  }[];
};

const DIALOG_TREE: Record<string, DialogNode> = {
  start: {
    text: "Xin chào Sensei! Hôm nay Arona có thể giúp gì cho Sensei ạ? Em đang truy cập vào cơ sở dữ liệu dự án của Trần Nhân đây!",
    options: [
      { label: "Báo cáo nghiên cứu khoa học tại NEU?", nextNode: "research" },
      { label: "Dự án sinh thái game Aniko là gì?", nextNode: "aniko" },
      { label: "Hỏi về sở thích Light Novel của Sensei?", nextNode: "hobby" },
    ],
  },
  research: {
    text: "Báo cáo khoa học: Trần Nhân hiện đang làm Trợ lý Nghiên cứu tại Trường Công nghệ - Đại học Kinh tế Quốc dân (NEU). Cậu ấy chuyên sâu về phân loại văn bản học thuật, Vector Embeddings và hệ thống RAG tìm kiếm thông minh đó Sensei!",
    options: [
      { label: "Thật ấn tượng! Còn game Aniko thì sao?", nextNode: "aniko" },
      { label: "Cậu ấy đang học thêm gì thế?", nextNode: "learning" },
      { label: "Quay lại menu chính nhé Arona.", nextNode: "start" },
    ],
  },
  aniko: {
    text: "Aniko là hệ sinh thái Web Game & Database cực đỉnh xoay quanh Anime/Manga! Cậu ấy đã code các mini-game như Anidle, AniTexto (giống variant Contexto) và AniGrid. Cậu ấy tự viết crawl tool lấy data từ các wiki Anime về làm DB riêng nữa!",
    options: [
      { label: "Tuyệt quá! Còn nghiên cứu NEU thì sao?", nextNode: "research" },
      { label: "Arona kể về sở thích dịch LN đi!", nextNode: "hobby" },
      { label: "Quay lại menu chính nào.", nextNode: "start" },
    ],
  },
  hobby: {
    text: "Ngoài việc code ra, Sensei Nhân là một otaku chính hiệu! Cậu ấy rất chăm chỉ dịch Light Novel từ tiếng Anh sang tiếng Việt lúc rảnh rỗi, là một Sensei tận tụy trong Blue Archive (Schale) và đang tự học tiếng Nhật để đọc LN gốc nữa!",
    options: [
      { label: "Thú vị đấy! Cậu ấy học công nghệ gì mới?", nextNode: "learning" },
      { label: "Trở lại menu chính nhé.", nextNode: "start" },
    ],
  },
  learning: {
    text: "Hiện tại cậu ấy đang tập trung học Advanced AI/ML để tối ưu hóa Vector Search và nghiên cứu các mô hình LLM nhỏ gọn chạy offline, song song với việc nâng cao kỹ năng tiếng Nhật (Japanese) để phục vụ công việc tương lai!",
    options: [
      { label: "Tuyệt vời! Cho tôi xem dự án Aniko.", nextNode: "aniko" },
      { label: "Quay lại từ đầu nha Arona.", nextNode: "start" },
    ],
  },
};

export default function Home() {
  const [context, setContext] = useState<"tech" | "otaku">("tech");
  const [isWiping, setIsWiping] = useState(false);
  const [dialogKey, setDialogKey] = useState("start");
  const [dialogText, setDialogText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wipeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cinematic screen sweep transition between Tech and Otaku mode
  const handleContextSwitch = () => {
    if (isWiping) return;
    setIsWiping(true);

    // 1. Wipe covers screen (400ms is peak of transition)
    wipeTimeoutRef.current = setTimeout(() => {
      setContext((prev) => (prev === "tech" ? "otaku" : "tech"));
    }, 400);

    // 2. Wipe leaves screen (800ms animation completed)
    setTimeout(() => {
      setIsWiping(false);
    }, 800);
  };

  // Handle Arona Typewriter Dialogue Animation
  useEffect(() => {
    const textToType = DIALOG_TREE[dialogKey]?.text || "";
    setDialogText("");
    setIsTyping(true);

    let index = 0;
    const interval = setInterval(() => {
      if (index < textToType.length) {
        setDialogText((prev) => prev + textToType.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15); // Fast typing speed

    return () => clearInterval(interval);
  }, [dialogKey]);

  // Interactive Neural Network Background Canvas (Tech Mode)
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

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouse = { x: -1000, y: -1000 };

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

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.45)";
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect particles to mouse
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.28 * (1 - distMouse / 180)})`;
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

  // Handle contact form submits
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Error: Vui lòng điền đầy đủ các thông tin!");
      return;
    }
    setFormStatus("SENDING");
    setTimeout(() => {
      setFormStatus("SUCCESS");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(""), 4000);
    }, 1200);
  };

  return (
    <div className={`${styles.page} ${context === "tech" ? "tech-theme" : "otaku-theme"}`}>
      {/* Background elements */}
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
          <div className={styles.logo} onClick={() => setDialogKey("start")}>
            <div className={styles.logoDot} />
            <span className={styles.logoText}>
              {context === "tech" ? "AIKO.OS" : "SCHALE.AIKO"}
            </span>
          </div>

          <nav>
            <ul className={styles.navList}>
              <li>
                <a href="#about" className={styles.navLink}>
                  Thông Tin
                </a>
              </li>
              <li>
                <a href="#projects" className={styles.navLink}>
                  Dự Án
                </a>
              </li>
              <li>
                <a href="#skills" className={styles.navLink}>
                  Kỹ Năng
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.navLink}>
                  Liên Hệ
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.switcherContainer}>
            <span className={styles.switchLabel}>
              {context === "tech" ? "🔬 Researcher" : "🎮 Sensei"}
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
              <span className={styles.switchIcon}>🔬</span>
              <span className={styles.switchIcon}>🎮</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`${styles.main} container`}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.tagline}>
              {context === "tech" ? (
                <>
                  <span className={styles.logoDot} /> System Online // NEU Researcher
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
                ? "IT Engineer // NLP & Scientific Research Assistant @ NEU"
                : "🎌 IT Engineer & Otaku Sensei tận tụy trong Blue Archive"}
            </p>
            <p className={styles.heroBio}>
              {context === "tech"
                ? "Đam mê kết hợp phân tích dữ liệu, xử lý ngôn ngữ tự nhiên (NLP), tìm kiếm ngữ cảnh RAG và lập trình web chuyên nghiệp để tạo ra các giải pháp phân loại và khai phá tri thức học thuật hiệu quả."
                : "Thích kết hợp các sở thích cá nhân (Anime, Game, Light Novels) vào thế giới lập trình. Tôi thường xuyên viết tool crawl dữ liệu và xây dựng hệ sinh thái Web Game (Aniko) để lưu trữ cơ sở dữ liệu riêng của mình."}
            </p>
            <div className={styles.ctas}>
              <a href="#projects" className={styles.btnPrimary}>
                {context === "tech" ? "Xem Dự Án" : "Khám Phá Game Center"}
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                Liên Hệ Ngay
              </a>
            </div>
          </div>

          {/* DYNAMIC CARD (Interactive VN dialogue or glowing HUD card) */}
          <div className={styles.visualNovelCard}>
            {context === "otaku" && (
              <div className={styles.haloContainer}>
                <div className={`${styles.baHalo} halo`} />
              </div>
            )}

            <div className={`${styles.holoFrame} glass-panel`}>
              <div className={styles.holoHeader}>
                <span>{context === "tech" ? "SYSTEM_HUD_INTERFACE_V1" : "A.R.O.N.A OS CONNECTED"}</span>
                <div className={styles.holoIndicator}>
                  <div className={styles.pingLight} />
                  <span>ONLINE</span>
                </div>
              </div>
              <div className={styles.holoBody}>
                {context === "tech" ? (
                  // TECH MODE HUD
                  <>
                    <h3 className={styles.avatarTitle}>
                      <span>💻</span> Trần Nhân // Portfolio.env
                    </h3>
                    <span className={styles.avatarSub}>Cấu hình hệ thống kỹ sư</span>
                    <div className={styles.dialogText}>
                      <code style={{ fontSize: "0.85rem", color: "var(--accent)" }}>
                        $ cat config.json
                        <br />
                        {`{`}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;"role": "Research Assistant & SE",
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;"workplace": "National Economics University",
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;"focus": ["NLP", "Vector Embeddings", "RAG"],
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;"passion": "Subculture Data Analysis"
                        <br />
                        {`}`}
                      </code>
                    </div>
                    <div className={styles.dialogOptions}>
                      <button
                        className={styles.dialogOptButton}
                        onClick={() => {
                          const contactSection = document.getElementById("contact");
                          if (contactSection) contactSection.scrollIntoView();
                        }}
                      >
                        <span>🚀 Initialize Contact Protocol</span>
                        <span className={styles.dialogOptIcon}>&gt;</span>
                      </button>
                      <button className={styles.dialogOptButton} onClick={handleContextSwitch}>
                        <span>🎮 Switch Context to Otaku Mode</span>
                        <span className={styles.dialogOptIcon}>&gt;</span>
                      </button>
                    </div>
                  </>
                ) : (
                  // OTAKU MODE BLUE ARCHIVE CHAT
                  <>
                    <h3 className={styles.avatarTitle}>
                      <span>Arona</span> // Hỗ Trợ Đắc Lực
                    </h3>
                    <span className={styles.avatarSub}>Hệ điều hành Arona OS v1.2</span>
                    <p className={styles.dialogText}>
                      {dialogText}
                      {isTyping && <span className="caret">|</span>}
                    </p>
                    <div className={styles.dialogOptions}>
                      {DIALOG_TREE[dialogKey]?.options.map((opt, i) => (
                        <button
                          key={i}
                          className={styles.dialogOptButton}
                          onClick={() => !isTyping && setDialogKey(opt.nextNode)}
                          disabled={isTyping}
                          style={{ opacity: isTyping ? 0.6 : 1 }}
                        >
                          <span>{opt.label}</span>
                          <span className={styles.dialogOptIcon}>★</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PROFILE & STAT SECTION */}
        <section id="about" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>
              {context === "tech" ? "01 // PROFILE" : "01 // THÔNG TIN SENSEI"}
            </span>
            <h2 className={styles.sectionTitle}>
              {context === "tech" ? "Tiểu Sử & Định Hướng" : "Hồ Sơ Nhân Vật"}
            </h2>
          </div>

          <div className={styles.aboutGrid}>
            <div className={styles.bioText}>
              <h3 style={{ fontSize: "1.5rem", color: "var(--accent)" }}>
                {context === "tech"
                  ? "Kỹ sư Phần mềm ứng dụng AI"
                  : "Một Sensei đam mê dịch thuật và lập trình"}
              </h3>
              <p className={styles.bioParagraph}>
                Chào mừng đến với không gian cá nhân của tôi! Tôi là Trần Nhân, hiện đang nghiên cứu khoa học, phân tích và phân loại các bài báo khoa học học thuật tại **Trường Công nghệ - Đại học Kinh tế Quốc dân (NEU)**. Tôi yêu thích việc xây dựng các công cụ phân tích văn bản thông minh, sử dụng kỹ thuật Vector Embeddings và Retrieval-Augmented Generation (RAG) để giúp quá trình tiếp cận học thuật trở nên trực quan hơn.
              </p>
              <p className={styles.bioParagraph}>
                Đồng thời, là một otaku tràn đầy đam mê, tôi không ngần ngại mang các công nghệ hiện đại vào sở thích cá nhân. Dự án nổi bật nhất của tôi là **Aniko** - một nền tảng Web Game & Cơ sở dữ liệu Anime tự crawl để lưu trữ các thông tin Anime/Manga yêu thích của mình và chia sẻ các trò chơi giải đố như Anidle, AniTexto đến cộng đồng cùng sở thích.
              </p>
            </div>

            {/* STAT CARD */}
            <div className={`${styles.statCard} glass-panel`}>
              <div className={styles.statCardHeader}>
                <span className={styles.statCardTitle}>
                  {context === "tech" ? "Chỉ Số Kỹ Năng" : "Chỉ Số Nhân Vật"}
                </span>
                <span className={styles.statLevel}>LV 85</span>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Lập Trình Web (React/NextJS)</span>
                  <span className={styles.statVal}>90% // EX</span>
                </div>
                <div className={styles.statProgressOuter}>
                  <div className={styles.statProgressInner} style={{ width: "90%" }} />
                </div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Khoa học Dữ liệu & AI/NLP (RAG)</span>
                  <span className={styles.statVal}>80% // A+</span>
                </div>
                <div className={styles.statProgressOuter}>
                  <div className={styles.statProgressInner} style={{ width: "80%" }} />
                </div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Dịch Thuật LN (Anh - Việt)</span>
                  <span className={styles.statVal}>85% // S</span>
                </div>
                <div className={styles.statProgressOuter}>
                  <div className={styles.statProgressInner} style={{ width: "85%" }} />
                </div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Ngôn ngữ Tiếng Nhật</span>
                  <span className={styles.statVal}>45% // N4/N3 Progress</span>
                </div>
                <div className={styles.statProgressOuter}>
                  <div className={styles.statProgressInner} style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>
              {context === "tech" ? "02 // ECOSYSTEM" : "02 // KHO DỰ ÁN"}
            </span>
            <h2 className={styles.sectionTitle}>
              {context === "tech" ? "Các Dự Án Nổi Bật" : "Hộp Đồ Chơi Công Nghệ"}
            </h2>
          </div>

          <div className={styles.projectsGrid}>
            {/* ANIKO CARD */}
            <div className={`${styles.projectCard} glass-panel glow-hover`}>
              <div className={styles.projectIconWrapper}>🎮</div>
              <h3 className={styles.projectTitle}>Aniko</h3>
              <p className={styles.projectDesc}>
                Hệ sinh thái Web Game & Cơ sở dữ liệu xoay quanh văn hóa subculture Anime/Manga. Tích hợp các minigame trí tuệ thú vị như Anidle, AniTexto, AniGrid... giúp kết nối các Otaku.
              </p>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>JavaScript</span>
                <span className={styles.projectTag}>React.js</span>
                <span className={styles.projectTag}>Web Scraping</span>
                <span className={styles.projectTag}>Game Development</span>
              </div>
              <a
                href="https://github.com/Aiko75/Aniko"
                target="_blank"
                rel="noreferrer"
                className={styles.projectLink}
              >
                <span>Xem mã nguồn trên GitHub</span>
                <span>➔</span>
              </a>
            </div>

            {/* NEU RAG SEARCH CARD */}
            <div className={`${styles.projectCard} glass-panel glow-hover`}>
              <div className={styles.projectIconWrapper}>🔬</div>
              <h3 className={styles.projectTitle}>NEU Paper Classifier & RAG</h3>
              <p className={styles.projectDesc}>
                Dự án nghiên cứu xây dựng hệ thống tự động phân tích cấu trúc, phân loại các đề tài nghiên cứu khoa học học thuật tại NEU và tìm kiếm ngữ cảnh thông minh bằng RAG.
              </p>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>Python</span>
                <span className={styles.projectTag}>NLP</span>
                <span className={styles.projectTag}>Vector DB</span>
                <span className={styles.projectTag}>Small LLMs</span>
              </div>
              <span className={styles.projectLink} style={{ color: "var(--foreground-muted)" }}>
                <span>Đang phát triển nghiên cứu</span>
                <span>🔒</span>
              </span>
            </div>

            {/* CONTEXT-AWARE CARD */}
            <div className={`${styles.projectCard} glass-panel glow-hover`}>
              <div className={styles.projectIconWrapper}>🔄</div>
              <h3 className={styles.projectTitle}>Context-Aware Switcher</h3>
              <p className={styles.projectDesc}>
                Hệ thống linh hoạt cho phép chuyển đổi ngữ cảnh giao diện và luồng thông tin thông minh giữa nội dung Anime thông thường và nội dung Subculture sâu rộng (H-Anime) một cách an toàn.
              </p>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>Next.js</span>
                <span className={styles.projectTag}>React Context</span>
                <span className={styles.projectTag}>CSS Variables</span>
                <span className={styles.projectTag}>Auth System</span>
              </div>
              <span className={styles.projectLink} style={{ color: "var(--foreground-muted)" }}>
                <span>Nằm trong hệ sinh thái Aniko</span>
                <span>🔒</span>
              </span>
            </div>
          </div>
        </section>

        {/* SKILLS & TIMELINE SECTION */}
        <section id="skills" className={styles.section}>
          <div className={styles.skillsSectionGrid}>
            {/* TECHNICAL STACK */}
            <div>
              <div className={styles.sectionTitleContainer}>
                <span className={styles.sectionPre}>03 // TECH STACK</span>
                <h2 className={styles.sectionTitle}>Công Nghệ Sử Dụng</h2>
              </div>
              <div className={styles.skillsColumn}>
                <div>
                  <h4 className={styles.skillsTitle}>💻 Lập Trình Frontend</h4>
                  <div className={styles.skillPillContainer}>
                    <span className={styles.skillPill}>HTML5 / CSS3</span>
                    <span className={styles.skillPill}>JavaScript</span>
                    <span className={styles.skillPill}>TypeScript</span>
                    <span className={styles.skillPill}>React.js</span>
                    <span className={styles.skillPill}>Next.js</span>
                    <span className={styles.skillPill}>Responsive Design</span>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <h4 className={styles.skillsTitle}>⚙️ Backend & AI</h4>
                  <div className={styles.skillPillContainer}>
                    <span className={styles.skillPill}>Node.js / Express</span>
                    <span className={styles.skillPill}>Python</span>
                    <span className={styles.skillPill}>FastAPI</span>
                    <span className={styles.skillPill}>NLP (Natural Language Processing)</span>
                    <span className={styles.skillPill}>Vector Embeddings</span>
                    <span className={styles.skillPill}>Chroma / Pinecone DB</span>
                    <span className={styles.skillPill}>RAG Models</span>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <h4 className={styles.skillsTitle}>🎒 Khác & Kỹ Năng Mềm</h4>
                  <div className={styles.skillPillContainer}>
                    <span className={styles.skillPill}>Git / GitHub Versioning</span>
                    <span className={styles.skillPill}>Web Data Scraping (Crawling)</span>
                    <span className={styles.skillPill}>SQLite / PostgreSQL</span>
                    <span className={styles.skillPill}>English-to-Vietnamese Translation</span>
                    <span className={styles.skillPill}>Japanese (Tiếng Nhật N4/N3)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACADEMIC RESEARCH TIMELINE */}
            <div>
              <div className={styles.sectionTitleContainer}>
                <span className={styles.sectionPre}>04 // NEU TIMELINE</span>
                <h2 className={styles.sectionTitle}>Nghiên Cứu Khoa Học</h2>
              </div>
              <div className={styles.timeline}>
                <div className={`${styles.timelineItem} glass-panel`}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>Trợ lý Nghiên cứu & Phát triển</h3>
                    <span className={styles.timelinePeriod}>Hiện tại</span>
                  </div>
                  <div className={styles.timelineSub}>
                    Trường Công nghệ - Đại học Kinh tế Quốc dân (NEU)
                  </div>
                  <p className={styles.timelineContent}>
                    Tham gia xây dựng các thuật toán phân tích văn bản chuyên sâu để tự động nhận dạng cấu trúc, phân loại, sắp xếp các bài viết và bài báo học thuật theo đề tài nghiên cứu của Khoa Công nghệ. Tối ưu cơ sở dữ liệu Vector để cải thiện độ chính xác cho hệ gợi ý học tập.
                  </p>
                </div>

                <div className={`${styles.timelineItem} glass-panel`}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>Crawl & Xây dựng Database Wiki</h3>
                    <span className={styles.timelinePeriod}>2025 - 2026</span>
                  </div>
                  <div className={styles.timelineSub}>Dự án Kho Cơ sở dữ liệu Subculture</div>
                  <p className={styles.timelineContent}>
                    Thiết kế và triển khai hệ crawler tự động thu thập thông tin Anime, nhân vật, cốt truyện từ các trang fandom/wiki tiếng Anh, làm sạch dữ liệu và cấu trúc hóa lưu trữ cục bộ dưới dạng quan hệ để cung cấp dữ liệu cho game.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>05 // CONTACT PROTOCOL</span>
            <h2 className={styles.sectionTitle}>Liên Hệ Với Trần Nhân</h2>
          </div>

          <div className={styles.contactGrid}>
            <div className={`${styles.contactInfoCard} glass-panel`}>
              <div className={styles.contactIntro}>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent)" }}>
                  {context === "tech" ? "Gửi Tín Hiệu Kết Nối" : "Gửi Thư Về Văn Phòng Schale"}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--foreground-muted)" }}>
                  Tôi luôn sẵn lòng thảo luận về các dự án lập trình web game thú vị, các cơ hội nghiên cứu AI/NLP/RAG tại trường, hoặc đơn giản là cùng đàm đạo về Anime và Light Novel!
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
                    <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)" }}>
                      EMAIL LIÊN HỆ
                    </div>
                    <div>trannhan07052005@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/Aiko75"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactLinkItem}
                  title="Ghé thăm GitHub cá nhân"
                >
                  <div className={styles.contactIcon}>🐙</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)" }}>
                      GITHUB PROFILE
                    </div>
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
                    <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)" }}>
                      FACEBOOK CÁ NHÂN
                    </div>
                    <div>thongminh.conga.73</div>
                  </div>
                </a>

                <a
                  href="https://www.youtube.com/@Nhako7525"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactLinkItem}
                  title="Ghé thăm kênh YouTube"
                >
                  <div className={styles.contactIcon}>▶</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)" }}>
                      YOUTUBE CHANNEL
                    </div>
                    <div>@Nhako7525</div>
                  </div>
                </a>
              </div>
            </div>

            {/* INPUT FORM */}
            <div className={`${styles.formCard} glass-panel`}>
              <form onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Tên của bạn / Organization</label>
                  <input
                    type="text"
                    id="name"
                    className={styles.inputField}
                    placeholder={context === "tech" ? "John Doe" : "Sensei đồng nghiệp..."}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup} style={{ marginTop: "16px" }}>
                  <label htmlFor="email">Địa chỉ Email</label>
                  <input
                    type="email"
                    id="email"
                    className={styles.inputField}
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup} style={{ marginTop: "16px" }}>
                  <label htmlFor="message">Nội dung tin nhắn</label>
                  <textarea
                    id="message"
                    className={styles.textareaField}
                    placeholder={
                      context === "tech"
                        ? "Đề xuất hợp tác hoặc câu hỏi của bạn..."
                        : "Nhắn nhủ gì đó đến Trần Nhân..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.btnPrimary}
                  style={{ width: "100%", marginTop: "24px" }}
                >
                  {formStatus === "SENDING" ? "Đang xử lý gói tin..." : "Gửi Tin Nhắn"}
                </button>

                {formStatus === "SUCCESS" && (
                  <div className={styles.terminalFeedback}>
                    [SYSTEM_LOG]: Gửi thành công! Gói tin đã được lưu vào hàng đợi và gửi tới hộp thư của Trần Nhân. Cảm ơn bạn!
                  </div>
                )}

                {formStatus.startsWith("Error") && (
                  <div className={styles.terminalFeedback} style={{ color: "#ff3366", borderColor: "#551122" }}>
                    [SYSTEM_ERROR]: {formStatus}
                  </div>
                )}
              </form>
            </div>
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
              : "STATUS: ARONA IS CURRENTLY SLEEPING ON SCHALE COUCH"}
          </p>
        </div>
      </footer>
    </div>
  );
}
