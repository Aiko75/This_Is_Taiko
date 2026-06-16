"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

// Các kiểu dữ liệu chung và cấu hình đối thoại
import { ChatMessage } from "./types";
import { DIALOG_TREE } from "./config/dialog";

// Các component dùng chung
import AronaHalo from "./components/AronaHalo";
import SkillPopup from "./components/SkillPopup";
import BlogPopup from "./components/BlogPopup";
import CampaignStage from "./components/CampaignStage";
import MomoTalk, { type ResponseMode } from "./components/MomoTalk";
import ProfHUD from "./components/ProfHUD";
import AronaChat from "./components/AronaChat";
import ChatMarkdown from "./components/ChatMarkdown";

// Dữ liệu từ CMS JSON
import projectsData from "./config/projects.json";
import profileData from "./config/profile.json";

export default function Home() {
  const [activeHeroTab, setActiveHeroTab] = useState<"arona" | "hud">("arona");
  const [dialogKey, setDialogKey] = useState("start");
  const [dialogText, setDialogText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Trạng thái hiển thị popup chi tiết kỹ năng
  const [activeSkill, setActiveSkill] = useState<any | null>(null);

  // Trạng thái hiển thị bài viết nhật ký
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any | null>(null);

  // Trạng thái hội thoại MomoTalk
  const [activePartner, setActivePartner] = useState<"arona" | "plana">("arona");
  
  const [aronaMessages, setAronaMessages] = useState<ChatMessage[]>([
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

  // Load blog posts từ API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("/api/blog");
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải nhật ký:", error);
      }
    };
    fetchBlog();
  }, []);

  // Hàm toggle phóng to/thu nhỏ chat + tự động chuyển chế độ trả lời
  const handleToggleMomoExpand = () => {
    setIsMomoExpanded((prev) => {
      const nextExpanded = !prev;
      // Tự động chuyển chế độ: mở rộng → đầy đủ, thu nhỏ → ngắn gọn
      setResponseMode(nextExpanded ? "detailed" : "concise");
      return nextExpanded;
    });
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Canvas vẽ hiệu ứng các hạt liên kết màu hồng ấm ở nền
  useEffect(() => {
    if (!canvasRef.current) return;

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
        ctx.fillStyle = "rgba(255, 77, 109, 0.35)";
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
  }, []);

  // Xử lý gửi tin nhắn MomoTalk và gọi AI API
  const handleMomoSubmit = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const messageText = directText || momoMsgInput;
    if (!messageText.trim()) {
      return;
    }

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
    <div className={styles.page}>
      {/* Nền động và lưới grid */}
      <div className="background-canvas" />
      <div className="scanlines" />
      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      {/* Header Điều Hướng */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.logo} onClick={() => {
            setDialogText("");
            setIsTyping(true);
            setDialogKey("start");
          }}>
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

      {/* Vùng nội dung chính */}
      <main className={`${styles.main} container`}>
        
        {/* PHẦN HERO */}
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

        {/* PHẦN GIỚI THIỆU BẢN THÂN */}
        <section id="about" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>01 // PERSONAL PROFILE</span>
            <h2 className={styles.sectionTitle}>Hồ Sơ Cá Nhân & Tiểu Sử</h2>
          </div>

          <div className={styles.aboutGrid}>
            <div className={styles.bioText}>
              <h3 style={{ fontSize: "1.4rem", color: "var(--accent)", fontWeight: 800 }}>
                Kỹ sư Phần mềm & Trợ lý Nghiên cứu AI
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
              <div className={styles.statCardHeader} style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
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
                  <span className={styles.statLevel} style={{ fontSize: "0.85rem", color: "var(--accent)", alignSelf: "flex-start", marginTop: "2px" }}>
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
                  <button key={idx} className={styles.baSkillBtn} onClick={() => setActiveSkill(highlight)}>
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

        {/* POPUP CHI TIẾT KỸ NĂNG */}
        {activeSkill && (
          <SkillPopup
            skillDetails={activeSkill}
            onClose={() => setActiveSkill(null)}
          />
        )}

        {/* PHẦN DỰ ÁN */}
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

        {/* PHẦN NHẬT KÝ & HOẠT ĐỘNG */}
        <section id="blog" className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <span className={styles.sectionPre}>03 // CHRONICLES & UPDATES</span>
            <h2 className={styles.sectionTitle}>Nhật Ký & Hoạt Động</h2>
          </div>

          {blogPosts.length === 0 ? (
            <div className="glass-panel" style={{ padding: "30px", textAlign: "center", color: "var(--foreground-muted)" }}>
              <span>Đang tải danh sách bài viết hoặc chưa có bài viết nào...</span>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {blogPosts.map((post, idx) => {
                const postDate = new Date(post.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });
                return (
                  <div 
                    key={idx} 
                    className={`${styles.projectCard} glass-panel`} 
                    style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}
                  >
                    <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                    <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                    <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                    <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                    
                    <div>
                      {post.image && (
                        <div style={{ 
                          width: "100%", 
                          height: "150px", 
                          overflow: "hidden", 
                          borderRadius: "6px", 
                          marginBottom: "12px", 
                          border: "1px solid rgba(255, 77, 109, 0.15)" 
                        }}>
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                          />
                        </div>
                      )}
                      <div style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 800, marginBottom: "6px" }}>
                        📅 {postDate}
                      </div>
                      <h3 
                        className={styles.projectTitle} 
                        style={{ fontSize: "1.05rem", marginBottom: "8px", lineBreak: "anywhere" }}
                      >
                        {post.title}
                      </h3>
                      <p 
                        className={styles.projectDesc} 
                        style={{ 
                          fontSize: "0.85rem", 
                          opacity: 0.85, 
                          marginBottom: "16px", 
                          lineClamp: 3, 
                          display: "-webkit-box", 
                          WebkitLineClamp: 3, 
                          WebkitBoxOrient: "vertical", 
                          overflow: "hidden" 
                        }}
                      >
                        {post.summary}
                      </p>
                    </div>

                    <button 
                      className={styles.projectBtn} 
                      onClick={() => setSelectedBlogPost(post)}
                      style={{ marginTop: "auto", width: "100%", textAlign: "center", display: "block" }}
                    >
                      <span>XEM CHI TIẾT BÀI ĐĂNG</span>
                      <span className={styles.projectBtnIcon}>&gt;</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* POPUP CHI TIẾT BÀI ĐĂNG */}
        {selectedBlogPost && (
          <BlogPopup 
            post={selectedBlogPost}
            onClose={() => setSelectedBlogPost(null)}
          />
        )}

        {/* BẢN ĐỒ CÔNG NGHỆ & LỊCH SỬ */}
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

        {/* PHẦN HỌC VẤN & CHỨNG CHỈ */}
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

        {/* PHẦN CÁC KHỐI NỘI DUNG TÙY BIẾN */}
        {((profileData as any).customBlocks || []).length > 0 && (
          <section id="custom-sections" className={styles.section}>
            <div className={styles.sectionTitleContainer}>
              <span className={styles.sectionPre}>07 // CUSTOM BLOCKS & NOTES</span>
              <h2 className={styles.sectionTitle}>Khối Nội Dung Tùy Biến</h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {((profileData as any).customBlocks || []).map((block: any, idx: number) => {
                switch (block.type) {
                  case "textBlock":
                    return (
                      <div key={idx} className="glass-panel" style={{ padding: "24px", position: "relative" }}>
                        <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                        {block.title && (
                          <h3 style={{ 
                            fontSize: "1.15rem", 
                            color: "var(--accent)", 
                            fontWeight: 800, 
                            marginBottom: "12px", 
                            textTransform: "uppercase" 
                          }}>
                            {block.title}
                          </h3>
                        )}
                        <div style={{ lineHeight: 1.7, opacity: 0.9, whiteSpace: "pre-wrap", fontSize: "0.92rem" }}>
                          {block.content}
                        </div>
                      </div>
                    );
                  case "imageBlock":
                    return (
                      <div key={idx} className="glass-panel" style={{ padding: "24px", position: "relative", textAlign: "center" }}>
                        <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                        {block.title && (
                          <h3 style={{ 
                            fontSize: "1.15rem", 
                            color: "var(--accent)", 
                            fontWeight: 800, 
                            marginBottom: "12px", 
                            textTransform: "uppercase", 
                            textAlign: "left" 
                          }}>
                            {block.title}
                          </h3>
                        )}
                        <img 
                          src={block.image} 
                          alt={block.title || "Custom Image"} 
                          style={{ 
                            maxWidth: "100%", 
                            maxHeight: "360px", 
                            objectFit: "contain", 
                            borderRadius: "6px", 
                            border: "1px solid rgba(255, 77, 109, 0.2)", 
                            marginTop: "8px" 
                          }} 
                        />
                        {block.caption && (
                          <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "10px", fontStyle: "italic" }}>
                            {block.caption}
                          </p>
                        )}
                      </div>
                    );
                  case "quoteBlock":
                    return (
                      <div 
                        key={idx} 
                        className="glass-panel" 
                        style={{ 
                          padding: "24px 28px", 
                          position: "relative", 
                          borderLeft: "4px solid var(--accent)", 
                          fontStyle: "italic", 
                          background: "rgba(255, 77, 109, 0.02)" 
                        }}
                      >
                        <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
                        <div className={styles.plusDecal + " " + styles.decalBR}>+</div>
                        <p style={{ fontSize: "1.08rem", lineHeight: 1.6, marginBottom: "8px", color: "var(--foreground)" }}>
                          "{block.quote}"
                        </p>
                        {block.author && (
                          <p style={{ 
                            textAlign: "right", 
                            fontWeight: 800, 
                            color: "var(--accent)", 
                            fontSize: "0.9rem", 
                            textTransform: "uppercase" 
                          }}>
                            — {block.author}
                          </p>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </section>
        )}

        {/* PHẦN LIÊN HỆ */}
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

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Trần Nhân. Thiết kế lấy cảm hứng từ Schale & Blue Archive.</p>
      </footer>
    </div>
  );
}
