import React from "react";
import styles from "../page.module.css";

type SkillPopupProps = {
  activeSkill: "ex" | "normal" | "passive" | "sub";
  onClose: () => void;
};

const skillDetails = {
  ex: {
    name: "EX: Aniko Game Center (Lvl 5 - Max)",
    type: "Kỹ năng tối thượng",
    desc: "Thiết kế và phát triển hệ sinh thái mini-game Aniko (React.js, CSS animations). Tích hợp các trò chơi giải đố thú vị như Anidle, AniTexto và AniGrid xoay quanh văn hóa Anime/Manga, đem lại trải nghiệm tương tác trực quan cho người dùng.",
    upgrade: "Hiệu ứng: Xây dựng cơ sở dữ liệu Anime riêng biệt bằng crawler chuyên dụng."
  },
  normal: {
    name: "Normal: Light Novel Translation (Lvl 5)",
    type: "Kỹ năng thường trực",
    desc: "Đam mê biên dịch tác phẩm Light Novel từ tiếng Anh sang tiếng Việt. Rèn luyện sự nhạy bén ngôn ngữ, diễn đạt văn phong trôi chảy tự nhiên và khả năng xử lý văn bản quy mô lớn một cách có hệ thống.",
    upgrade: "Hiệu ứng: Mở rộng vốn từ vựng và tối ưu khả năng diễn đạt ngôn từ song ngữ."
  },
  passive: {
    name: "Passive: Japanese Self-Learning (Lvl 3)",
    type: "Kỹ năng bị động",
    desc: "Tự học tiếng Nhật cơ bản (hướng tới N4/N3) phục vụ cho việc đọc trực tiếp tài liệu gốc và kết nối công việc. Tập trung cao độ vào ngữ pháp, từ vựng và tự luyện dịch thô qua các đoạn văn học.",
    upgrade: "Hiệu ứng: Gia tăng khả năng tiếp nhận tri thức đa ngôn ngữ lên 30%."
  },
  sub: {
    name: "Sub: Subculture Data Crawler (Lvl 4)",
    type: "Kỹ năng hỗ trợ",
    desc: "Lập trình các script tự động thu thập thông tin Anime, nhân vật, và cốt truyện từ các wiki/fandom quốc tế. Làm sạch và chuẩn hóa cơ sở dữ liệu quan hệ cục bộ để lưu trữ và phân tích dữ liệu hiệu quả.",
    upgrade: "Hiệu ứng: Khả năng khai phá tài nguyên và cấu trúc dữ liệu không đồng nhất."
  }
};

export default function SkillPopup({ activeSkill, onClose }: SkillPopupProps) {
  const details = skillDetails[activeSkill];

  return (
    <div className={styles.skillPopupOverlay} onClick={onClose}>
      <div className={`${styles.skillPopupCard} glass-panel`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.plusDecal + " " + styles.decalTL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalTR}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBL}>+</div>
        <div className={styles.plusDecal + " " + styles.decalBR}>+</div>

        <div className={styles.skillPopupHeader}>
          <span className={styles.skillPopupTitle}>{details.name}</span>
          <button className={styles.skillPopupClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.skillPopupBody}>
          <span className={styles.skillPopupType}>{details.type}</span>
          <p className={styles.skillPopupDesc}>{details.desc}</p>
          <div className={styles.skillPopupUpgrade}>
            <strong>Level Up Info:</strong> {details.upgrade}
          </div>
        </div>
      </div>
    </div>
  );
}
