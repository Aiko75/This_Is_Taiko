# TRANNHAN.DEV (v2.1.0) - Personal Interactive Hub & AI Chatbot System

Trang giới thiệu cá nhân và hồ sơ năng lực tương tác thông minh của **Trần Nhân** (Scientific Research Assistant @ NEU & Software Engineer). Dự án được thiết kế lấy cảm hứng từ bảng điều khiển máy tính bảng **Schale Tablet** và giao diện tin nhắn **MomoTalk** trong thế giới game **Blue Archive**.

---

## 🌟 Tính Năng Nổi Bật (Version 2.1.0)

### 1. MomoTalk AI Chatbot Song Nhân Vật (Arona & Plana OS)
*   **Dual OS AI Assistants:** Tích hợp hai chatbot thông minh có tính cách tương phản:
    *   **Arona:** Đáng yêu, năng nổ, nhiệt huyết, sử dụng nhiều emoji dễ thương (`🌸`, `⚡`, `o(≧▽≦)o`) và xưng hô thân mật.
    *   **Plana:** Nghiêm túc, máy móc, nói năng logic, luôn mở đầu bằng cấu trúc báo cáo hệ thống (`Báo cáo Sensei...`, `Hệ thống ghi nhận...`) và hạn chế emoji tối đa.
*   **Hộp Thoại Độc Lập:** Giao diện sidebar cho phép chuyển đổi mượt mà giữa hai chatbot với lịch sử trò chuyện được lưu trữ và hiển thị độc lập.
*   **NotebookLM-Style Suggestion Chips:** Tự động đưa ra các chip câu hỏi gợi ý thông minh (về NEU, các dự án, kỹ năng chuyên môn, cách liên hệ) ở cuối khung chat. Click vào gợi ý để gửi nhanh tin nhắn lập tức.
*   **Tùy Chọn Chế Độ Phản Hồi:** Hỗ trợ chuyển đổi nhanh giữa hai chế độ trả lời:
    *   *⚡ Ngắn gọn:* Phản hồi súc tích dưới 3 câu, tập trung trọng tâm.
    *   *📝 Đầy đủ:* Cung cấp thông tin chi tiết, có cấu trúc rõ ràng.
*   **Cơ Chế Khóa Cận Cảnh (Expand Mode):** Hỗ trợ phóng to khung chat chiếm trọn trung tâm màn hình kèm hiệu ứng làm mờ nền (backdrop blur).
*   **Fallback Thông Minh:** Tự động phản hồi bằng tin nhắn tĩnh giả lập phù hợp với tính cách từng nhân vật nếu server chưa được cấu hình API Key.
*   **Đồng Bộ Ngữ Cảnh Tự Động:** Toàn bộ thông tin học tập, bài đăng nhật ký hoạt động và khối tùy chỉnh đều được tự động hóa làm ngữ cảnh đầu vào (context) để AI trả lời thông minh.

### 2. Thiết Kế & Trải Nghiệm Cao Cấp (Premium UI/UX)
*   **Aesthetics:** Sử dụng bảng màu phối hợp HSL đặc trưng, hiệu ứng đổ bóng kính (glassmorphism), và vòng phát sáng động (Halo) xoay xung quanh avatar.
*   **Nền Động Hạt Kết Nối:** Vẽ liên kết giữa các hạt chuyển động màu hồng ấm trên canvas nền, tương tác theo cử động chuột.
*   **Unified Interactive HUD:** Bảng điều khiển tích hợp cho phép chuyển đổi nhanh giữa việc trò chuyện với Arona/Plana và màn hình Chẩn đoán thông số lý lịch chuyên nghiệp của lập trình viên (Kinh nghiệm, chuyên môn chính, định hướng, đơn vị công tác, công cụ làm việc).
*   **Skill Detail Dialogs:** Click vào các kỹ năng trọng tâm (Web Dev, AI Research, Dịch thuật, Crawler) để hiển thị chi tiết mô tả dự án và vai trò một cách gọn gàng.
*   **Quá Trình Học Vấn & Chứng Chỉ:** Mục hiển thị dạng lưới kính giới thiệu chi tiết GPA, bằng cấp và hình ảnh chứng chỉ công nghệ (ví dụ: Google Gemini Certification) đẹp mắt.
*   **Trình Dựng Trang Linh Hoạt:** Hiển thị các khối nội dung động (Văn bản tự do, Ảnh lớn nổi bật, Trích dẫn danh ngôn) theo đúng thứ tự được thiết kế trên Admin.

### 3. Quản Lý Nội Dung Động (Decap CMS)
*   Toàn bộ thông tin cá nhân (`profile.json`), danh sách dự án (`projects.json`) và bài viết nhật ký (`src/app/content/blog/`) đều được tách rời thành các tệp tin cấu hình tĩnh dạng JSON giúp quản lý dễ dàng bằng Git.
*   Tích hợp sẵn trang quản trị **Decap CMS** tại địa chỉ `/admin/index.html` để tải ảnh đại diện, viết bài nhật ký, thêm học vấn, chứng chỉ, và kéo thả sắp xếp thứ tự các khối tùy biến một cách trực quan.

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
