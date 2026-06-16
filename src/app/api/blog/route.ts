import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "src/app/content/blog");
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json([]);
    }
    const files = fs.readdirSync(dirPath);
    const posts = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(fileContent);
        return {
          ...data,
          slug: file.replace(".json", ""),
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(posts);
  } catch (error) {
    console.error("API Blog error:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống khi tải bài viết" },
      { status: 500 }
    );
  }
}
