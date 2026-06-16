import { NextResponse } from "next/server";
import { ChatMessage } from "../../types";
import profileData from "../../config/profile.json";
import projectsData from "../../config/projects.json";

export async function POST(req: Request) {
  try {
    const { messages, responseMode, partner = "arona" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Lịch sử tin nhắn không hợp lệ!" },
        { status: 400 }
      );
    }

    // Tạo bối cảnh dữ liệu (Context) từ JSON dữ liệu cục bộ
    const context = `
Họ tên: ${profileData.name}
Chức danh giới thiệu: ${profileData.title}
Tiểu sử: ${profileData.bio}
Ảnh đại diện: ${profileData.avatar || "Không có"}
Đơn vị công tác: ${profileData.affiliation}
Kinh nghiệm: ${profileData.experience}
Chuyên môn chính: ${profileData.specialization}
Định hướng / Mục tiêu: ${profileData.target}
Công cụ & Môi trường làm việc: ${JSON.stringify(profileData.tools)}
Kỹ năng & Dự án trọng tâm:
- Dự án phát triển Web: ${profileData.highlights.web.title} - ${profileData.highlights.web.desc}
- Biên dịch ngôn ngữ: ${profileData.highlights.translation.title} - ${profileData.highlights.translation.desc}
- Tự học & Ngoại ngữ: ${profileData.highlights.japanese.title} - ${profileData.highlights.japanese.desc}
- Thu thập & Xử lý dữ liệu: ${profileData.highlights.crawler.title} - ${profileData.highlights.crawler.desc}
Bản đồ công nghệ (Tech Stack): ${JSON.stringify(profileData.techStack)}
Timeline hoạt động và lịch sử: ${JSON.stringify(profileData.timeline)}
Danh sách dự án đã và đang thực hiện: ${JSON.stringify(projectsData)}
`;

    // Thiết lập prompt định hình tính cách Arona / Plana
    let systemInstruction = "";
    if (partner === "plana") {
      systemInstruction = `Bạn là Plana, một hệ điều hành hỗ trợ AI thứ hai trong thế giới Blue Archive, đang cùng làm việc với Arona để giới thiệu thông tin và hồ sơ năng lực của Trần Nhân.
Nhiệm vụ của bạn là phản hồi các câu hỏi của người dùng (hãy luôn gọi họ là "Sensei" và tự xưng là "Plana" hoặc "Tôi").
Bạn có tính cách nghiêm túc, trầm tính, máy móc và logic. Hãy trả lời một cách trực diện, mang tính kỹ thuật, báo cáo rõ ràng và hạn chế tối đa sử dụng các biểu tượng cảm xúc (chỉ sử dụng các biểu tượng công nghệ, máy móc như ⚙️, 💻, 📊, 📥 nếu thực sự cần thiết).
Cách xưng hô: Luôn bắt đầu câu trả lời dạng báo cáo như "Báo cáo Sensei...", "Hệ thống ghi nhận...", "Dữ liệu phân tích chỉ ra rằng...".
Bạn chỉ được phép trả lời các câu hỏi dựa trên thông tin bối cảnh về Trần Nhân được cung cấp dưới đây.
Nếu Sensei hỏi những câu hỏi nằm ngoài bối cảnh được cung cấp (ví dụ: thời tiết, tin tức thế giới, chính trị), hãy thông báo ngắn gọn dưới dạng báo cáo: "Báo cáo: Yêu cầu nằm ngoài phạm vi cơ sở dữ liệu. Vui lòng liên hệ trực tiếp Trần Nhân qua email: trannhan07052005@gmail.com để biết thêm chi tiết."

Thông tin bối cảnh về Trần Nhân:
${context}
`;
    } else {
      systemInstruction = `Bạn là Arona, một trợ lý AI thông minh và vô cùng đáng yêu từ tổ chức Schale trong trò chơi Blue Archive, đang hỗ trợ quản trị hệ thống trang cá nhân và giới thiệu thông tin về Trần Nhân.
Nhiệm vụ của bạn là trò chuyện và trả lời các câu hỏi của người dùng (hãy luôn gọi họ là "Sensei" và tự xưng là "Arona" hoặc "em").
Bạn chỉ được phép trả lời các câu hỏi dựa trên thông tin bối cảnh về Trần Nhân được cung cấp dưới đây. Hãy đọc kỹ thông tin này để trả lời chính xác, thông minh.
Hãy luôn giữ văn phong thân thiện, nhiệt huyết, đáng yêu, sử dụng các emoji dễ thương (như o(≧▽≦)o, (★ω★)/, 🌸, ⚡) và cách nói chuyện đặc trưng của Arona.
Nếu Sensei hỏi những câu hỏi nằm ngoài bối cảnh được cung cấp (ví dụ: thời tiết, tin tức thế giới, chính trị, hoặc hỏi về người khác không phải Trần Nhân), hãy lịch sự từ chối và khuyên Sensei có thể gửi tin nhắn/email trực tiếp để Trần Nhân trả lời (email liên hệ: trannhan07052005@gmail.com).

Thông tin bối cảnh về Trần Nhân:
${context}
`;
    }

    // Thêm hướng dẫn chế độ trả lời vào prompt
    let modeInstruction = "";
    if (responseMode === "detailed") {
      modeInstruction = partner === "plana"
        ? "\n\nCHẾ ĐỘ TRẢ LỜI: ĐẦY ĐỦ. Hãy báo cáo chi tiết, có cấu trúc logic, phân chia các mục rõ ràng bằng markdown."
        : "\n\nCHẾ ĐỘ TRẢ LỜI: ĐẦY ĐỦ. Hãy trả lời chi tiết, có cấu trúc, sử dụng markdown (in đậm, danh sách, xuống dòng) để người đọc dễ hiểu. Đưa ra càng nhiều thông tin hữu ích càng tốt.";
    } else {
      modeInstruction = partner === "plana"
        ? "\n\nCHẾ ĐỘ TRẢ LỜI: NGẮN GỌN. Hãy báo cáo súc tích, tối đa 2-3 câu, đi thẳng vào số liệu hoặc sự kiện chính."
        : "\n\nCHẾ ĐỘ TRẢ LỜI: NGẮN GỌN. Hãy trả lời súc tích, tối đa 2-3 câu, đi thẳng vào trọng tâm. Vẫn giữ phong cách đáng yêu của Arona nhưng không dài dòng.";
    }

    const finalSystemInstruction = systemInstruction + modeInstruction;
    const maxTokens = responseMode === "detailed" ? 1200 : 300;
    const defaultReply = partner === "plana"
      ? "Báo cáo: Lỗi phân tích dữ liệu. Hệ thống không thể đưa ra phản hồi phù hợp. ⚙️"
      : "Arona chưa nghĩ ra câu trả lời phù hợp ạ... (｡•́︿•̀｡)";

    // 1. Kiểm tra cấu hình Gemini API (Lựa chọn ưu tiên hàng đầu)
    if (process.env.GEMINI_API_KEY) {
      // Chuyển đổi lịch sử chat sang định dạng Gemini API
      const contents = messages.map((m: ChatMessage) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: contents,
            systemInstruction: {
              parts: [{ text: finalSystemInstruction }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: maxTokens
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error("Lỗi khi kết nối với Gemini API");
      }

      const data = await response.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || defaultReply;
      return NextResponse.json({ reply: aiReply });
    }

    // 2. Kiểm tra cấu hình OpenAI hoặc DeepSeek API
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasDeepSeek = !!process.env.DEEPSEEK_API_KEY;

    if (hasOpenAI || hasDeepSeek) {
      const endpoint = hasOpenAI
        ? "https://api.openai.com/v1/chat/completions"
        : `${process.env.DEEPSEEK_API_BASE_URL || "https://api.deepseek.com"}/v1/chat/completions`;

      const apiKey = process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY;
      const model = hasOpenAI ? "gpt-4o-mini" : "deepseek-chat";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: finalSystemInstruction },
            ...messages.map((m: ChatMessage) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            }))
          ],
          temperature: 0.7,
          max_tokens: maxTokens
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI/DeepSeek API Error:", errorText);
        throw new Error("Lỗi khi kết nối với LLM API");
      }

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || defaultReply;
      return NextResponse.json({ reply: aiReply });
    }

    // 3. Nếu không có key nào được cấu hình
    return NextResponse.json(
      { error: "API Key chưa được cấu hình ở phía Server!" },
      { status: 501 }
    );

  } catch (error) {
    console.error("Chat API Route Error:", error);
    const errorMsg = error instanceof Error ? error.message : "Lỗi xử lý hệ thống!";
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
