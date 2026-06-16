# BẢN CẬP NHẬT TÍNH NĂNG & PHÁT HÀNH PHIÊN BẢN v2.1.0

Tài liệu này ghi nhận toàn bộ các tính năng mới, cải tiến cấu trúc, và các lỗi được khắc phục trong phiên bản **v2.1.0** của trang portfolio tương tác cá nhân **TRANNHAN.DEV**.

---

## 📋 Tóm tắt phiên bản
* **Phiên bản hiện tại:** v2.1.0 (Nâng cấp từ v2.0.0)
* **Ngày phát hành:** 16 tháng 06, 2026
* **Mục tiêu chính:** Tối ưu hóa tính chuyên nghiệp của hồ sơ cá nhân, mở rộng khả năng quản trị nội dung linh hoạt qua Decap CMS, tích hợp sâu dữ liệu mới vào AI Chatbot, và cải thiện trải nghiệm cuộn trang khi tải.

---

## 🌟 Các tính năng mới & Cải tiến lớn

### 1. Chuyển đổi sang Bố cục Hồ sơ Chuyên nghiệp (Professional Layout)
* **Loại bỏ các thuật ngữ Game:** Loại bỏ hoàn toàn các danh xưng game Blue Archive tại các nhãn thông tin chính (Sensei Level, Striker, Attacker, EX/Normal/Passive/Sub Skills...) để thay thế bằng các thuật ngữ chuyên môn thực tế và rõ ràng:
  * *Số năm kinh nghiệm* (thay cho Sensei Level)
  * *Chuyên môn chính* (thay cho Attacker Type)
  * *Định hướng / Mục tiêu* (thay cho Striker Type)
  * *Đơn vị công tác* (thay cho Academy)
  * *Công cụ & Môi trường làm việc* (thay cho Terrain Ranks)
* **Hỗ trợ Avatar cá nhân:** Thêm khung tròn hiển thị ảnh đại diện (`avatar`) tại bảng điều khiển thông tin chuyên môn, có vòng Halo phát sáng xoay xung quanh tạo điểm nhấn công nghệ đặc sắc. Dễ dàng tải/chỉnh sửa ảnh từ Admin.

### 2. Hệ thống Nhật ký & Nhật ký hoạt động (Blog / Diary System)
* **Cơ sở dữ liệu dạng tệp tĩnh:** Tạo một thư mục lưu trữ các bài viết độc lập dưới dạng file JSON tại `src/app/content/blog/`, giúp dễ dàng đồng bộ qua Git.
* **API xử lý tự động:** Viết API Endpoint `/api/blog` để tự động đọc toàn bộ danh sách bài viết, sắp xếp theo thời gian mới nhất và trả về cho phía Client.
* **Giao diện hiển thị kính (`03 // CHRONICLES & UPDATES`):** Hiển thị danh sách bài viết trên trang chủ dưới dạng thẻ kính mờ (glassmorphism), hỗ trợ xem chi tiết toàn bộ nội dung bài viết bằng Markdown thông qua Popup động.

### 3. Khối Học vấn & Chứng chỉ (`06 // CREDENTIALS & ACADEMICS`)
* **Học vấn (Education):** Hiển thị quá trình học tập tại các trường (ví dụ: Đại học Kinh tế Quốc dân - NEU), bằng cấp, chuyên ngành, niên khóa, điểm số GPA nổi bật và các chi tiết hoạt động xã hội/nghiên cứu khoa học liên quan.
* **Chứng chỉ chuyên môn (Certificates):** Hiển thị danh sách chứng chỉ đạt được (như *Gemini Developer Certification*, *Machine Learning Specialization*...) kèm năm cấp, nhà tổ chức cấp và hình ảnh chứng chỉ thu nhỏ sắc nét.

### 4. Trình dựng trang bằng Khối tùy biến (Custom Blocks Page Builder - `07 // CUSTOM BLOCKS & NOTES`)
* **Kéo thả block động:** Cho phép người quản trị tự do thêm mới, xóa và kéo thả thay đổi vị trí hiển thị của các khối nội dung tùy biến trực tiếp từ Decap CMS.
* **Hỗ trợ 3 loại block phổ biến:**
  1. **Rich Text Block (Khối Văn bản):** Định dạng Markdown tự do, thích hợp viết lời chào, giới thiệu chi tiết hoặc ghi chú.
  2. **Image Block (Khối Ảnh nổi bật):** Đăng tải hình ảnh lớn nổi bật kèm tiêu đề và chú thích ảnh ở chân trang.
  3. **Quote Block (Khối Trích dẫn):** Hiển thị các câu trích dẫn danh ngôn, thiết kế viền trái hồng đậm nổi bật cùng tên tác giả/nguồn.

### 5. Tối ưu hóa API AI Chatbot (Arona & Plana OS)
* **Đồng bộ hóa dữ liệu ngữ cảnh (Context):** Cập nhật API route `/api/chat` tự động mã hóa toàn bộ dữ liệu mới (Học vấn, Chứng chỉ, các bài đăng Nhật ký, nội dung các Custom Blocks) gửi làm dữ liệu nền cho mô hình AI Gemini.
* **Nâng cao khả năng phản hồi:** Trợ lý ảo Arona và Plana giờ đây có đầy đủ kiến thức cập nhật về quá trình học tập của Trần Nhân, danh sách giải thưởng chứng chỉ, và có thể dẫn chứng các nội dung tùy biến đang hiển thị trên trang chủ để trả lời Sensei.

---

## 🛠️ Các lỗi đã sửa (Bug Fixes & Optimizations)

### 1. Sửa lỗi cú pháp cấu hình Decap CMS
* **Lỗi gặp phải:** Lỗi semantic YAML tại thuộc tính `drops` của dự án trong tệp cấu hình `public/admin/config.yml` (dòng 137) khiến trang quản trị `/admin` báo lỗi cấu hình và không tải được dữ liệu.
* **Khắc phục:** Chuyển đổi từ định dạng dòng (flow style) bị lỗi cú pháp ngoặc nhọn `{` sang định dạng khối (block style) chuẩn xác của YAML để CMS hoạt động mượt mà trở lại.

### 2. Khắc phục lỗi tự động nhảy/cuộn trang khi tải
* **Lỗi gặp phải:** Khi người dùng vừa truy cập vào trang chủ `https://taiko.io.vn`, trang web tự động bị cuộn (scroll) thẳng xuống cuối trang (phần Liên hệ / MomoTalk).
* **Khắc phục:** Sử dụng biến tham chiếu trạng thái render đầu tiên (`isFirstRender` ref) trong component `MomoTalk.tsx` để bỏ qua việc chạy lệnh `scrollIntoView` khi mount trang lần đầu, trả lại vị trí cuộn mặc định ở đầu trang cho người dùng.

---

## 📂 Các file thay đổi chính trong đợt cập nhật này

* [config.yml](file:///d:/My_projects/This_Is_Taiko/public/admin/config.yml): Cấu hình nhập liệu Tiếng Việt cho Avatar, Học vấn, Chứng chỉ và Trình dựng block tùy biến.
* [profile.json](file:///d:/My_projects/This_Is_Taiko/src/app/config/profile.json): Tệp cấu trúc lưu trữ cơ sở dữ liệu lý lịch cập nhật của Trần Nhân.
* [page.tsx](file:///d:/My_projects/This_Is_Taiko/src/app/page.tsx): Phát triển UI cho phần Học vấn, Chứng chỉ, render động các Khối tùy biến, chỉnh sửa thanh Menu điều hướng.
* [MomoTalk.tsx](file:///d:/My_projects/This_Is_Taiko/src/app/components/MomoTalk.tsx): Sửa logic scroll để ngăn chặn lỗi cuộn trang khi mới tải.
* [route.ts (Chat API)](file:///d:/My_projects/This_Is_Taiko/src/app/api/chat/route.ts): Nâng cấp prompt bối cảnh cho Arona và Plana.
* [route.ts (Blog API)](file:///d:/My_projects/This_Is_Taiko/src/app/api/blog/route.ts): API Endpoint mới đọc dữ liệu tệp bài viết JSON.
