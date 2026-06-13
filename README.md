# TRANNHAN.DEV (v2.0.0) - Personal Interactive Hub & AI Chatbot System

Trang giới thiệu cá nhân và hồ sơ năng lực tương tác thông minh của **Trần Nhân** (Scientific Research Assistant @ NEU & Software Engineer). Dự án được thiết kế lấy cảm hứng từ bảng điều khiển máy tính bảng **Schale Tablet** và giao diện tin nhắn **MomoTalk** trong thế giới game **Blue Archive**.

---

## 🌟 Tính Năng Nổi Bật (Version 2.0.0)

### 1. MomoTalk AI Chatbot Song Nhân Vật (Arona & Plana OS)
*   **Dual OS AI Assistants:** Tích hợp hai chatbot thông minh có tính cách tương phản:
    *   **Arona:** Đáng yêu, năng nổ, nhiệt huyết, sử dụng nhiều emoji dễ thương (`🌸`, `⚡`, `o(≧▽≦)o`) và xưng hô thân mật.
    *   **Plana:** Nghiêm túc, máy móc, nói năng logic, luôn mở đầu bằng cấu trúc báo cáo hệ thống (`Báo cáo Sensei...`, `Hệ thống ghi nhận...`) và hạn chế emoji tối đa.
*   **Hộp Thoại Độc Lập:** Giao diện sidebar cho phép chuyển đổi mượt mà giữa hai chatbot với lịch sử trò chuyện được lưu trữ và hiển thị độc lập.
*   **NotebookLM-Style Suggestion Chips:** Tự động đưa ra các chip câu hỏi gợi ý thông minh (về NEU, dự án, EX skill, cách liên hệ) ở cuối khung chat. Click vào gợi ý để gửi nhanh tin nhắn lập tức.
*   **Tùy Chọn Chế Độ Phản Hồi:** Hỗ trợ chuyển đổi nhanh giữa hai chế độ trả lời:
    *   *⚡ Ngắn gọn:* Phản hồi súc tích dưới 3 câu, tập trung trọng tâm.
    *   *📝 Đầy đủ:* Cung cấp thông tin chi tiết, có cấu trúc rõ ràng.
*   **Cơ Chế Khóa Cận Cảnh (Expand Mode):** Hỗ trợ phóng to khung chat chiếm trọn trung tâm màn hình kèm hiệu ứng làm mờ nền (backdrop blur).
*   **Fallback Thông Minh:** Tự động phản hồi bằng tin nhắn tĩnh giả lập phù hợp với tính cách từng nhân vật nếu server chưa được cấu hình API Key.

### 2. Thiết Kế & Trải Nghiệm Cao Cấp (Premium UI/UX)
*   **Aesthetics:** Sử dụng bảng màu phối hợp HSL đặc trưng, hiệu ứng đổ bóng kính (glassmorphism), và vòng phát sáng động (Halo) xoay xung quanh avatar.
*   **Nền Động Hạt Kết Nối:** Vẽ liên kết giữa các hạt chuyển động màu hồng ấm trên canvas nền, tương tác theo cử động chuột.
*   **Unified Interactive HUD:** Bảng điều khiển tích hợp cho phép chuyển đổi nhanh giữa việc trò chuyện với Arona/Plana và màn hình Chẩn đoán thông số lập trình viên (Terrain ranks, Kỹ năng chiến đấu, Bản đồ công nghệ).
*   **Skill Detail Dialogs:** Click vào các kỹ năng (EX, Normal, Passive, Sub) để hiển thị chi tiết chỉ số nâng cấp giống giao diện nhân vật trong game.

### 3. Quản Lý Nội Dung Động (Decap CMS)
*   Toàn bộ thông tin cá nhân (`profile.json`) và dự án (`projects.json`) đều được tách rời thành file cấu hình tĩnh dạng JSON.
*   Tích hợp sẵn trang quản trị **Decap CMS** tại địa chỉ `/admin/index.html` để dễ dàng cập nhật thông tin qua giao diện kéo thả trực quan.

---

## 🛠️ Công Nghệ Sử Dụng

*   **Core:** Next.js (App Router), React, TypeScript.
*   **Styling:** Vanilla CSS Modules (Tối ưu hiệu năng, không dùng framework cồng kềnh).
*   **AI Engine (Backend Route):**
    *   *Gemini API (Mặc định):* Sử dụng mô hình thế hệ mới nhất `gemini-2.5-flash` cho Free Tier ổn định, phản hồi nhanh (~3 giây).
    *   *OpenAI / DeepSeek (Tùy chọn):* Hỗ trợ cấu hình mô hình `gpt-4o-mini` hoặc `deepseek-chat`.
*   **Markdown Engine:** Bộ parser tự xây dựng siêu nhẹ để hiển thị văn bản in đậm, in nghiêng, danh sách trong bong bóng chat mà không làm tăng dung lượng bundle.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Chuẩn bị biến môi trường
Tạo file `.env.local` ở thư mục gốc của dự án và điền API Key của bạn (Copy từ cấu trúc mẫu trong [.env.example](file:///.env.example)):
```env
# Google Gemini API (Khuyên dùng)
GEMINI_API_KEY=AIzaSy...

# Hoặc OpenAI API
OPENAI_API_KEY=sk-...

# Hoặc DeepSeek / Nhà cung cấp bên thứ 3 tương thích OpenAI
DEEPSEEK_API_KEY=sk-...
DEEPSEEK_API_BASE_URL=https://api.deepseek.com
```

### 2. Chạy Dev Server phát triển
Cài đặt dependencies và khởi chạy Next.js cục bộ:
```bash
npm install
npm run dev
```
Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để trải nghiệm.

### 3. Mở trang quản trị Admin CMS
Để chạy CMS cục bộ, bạn cần mở thêm một terminal mới và chạy proxy:
```bash
npx decap-server
```
Sau đó truy cập [http://localhost:3000/admin/](http://localhost:3000/admin/) để đăng nhập và chỉnh sửa nội dung.

### 4. Build phiên bản Production
```bash
npm run build
```

---

## 📂 Cấu Trúc Thư Mục Quan Trọng

*   [`src/app/api/chat/route.ts`](file:///d:/My_projects/This_Is_Taiko/src/app/api/chat/route.ts): API Route trung gian xử lý chat RAG, định hình prompt cho Arona và Plana.
*   [`src/app/components/MomoTalk.tsx`](file:///d:/My_projects/This_Is_Taiko/src/app/components/MomoTalk.tsx): Giao diện MomoTalk chat song song, quản lý gợi ý câu hỏi.
*   [`src/app/components/Icons.tsx`](file:///d:/My_projects/This_Is_Taiko/src/app/components/Icons.tsx): Chứa mã nguồn vẽ Vector SVG cho Arona, Plana và Sensei.
*   [`src/app/config/`](file:///d:/My_projects/This_Is_Taiko/src/app/config/): Thư mục lưu dữ liệu JSON lý lịch (`profile.json`) và dự án (`projects.json`).
*   [`public/admin/`](file:///d:/My_projects/This_Is_Taiko/public/admin/): Trang tĩnh cấu hình và hiển thị Decap CMS.
