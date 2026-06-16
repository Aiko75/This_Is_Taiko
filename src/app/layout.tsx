import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aiko.OS // Trần Nhân - Software Engineer & Researcher",
  description: "Cổng thông tin và hồ sơ cá nhân của Trần Nhân (Aiko75) - Kỹ sư Phần mềm, Nhà nghiên cứu tại NEU và Otaku. Khám phá các dự án công nghệ và sở thích cá nhân.",
  keywords: ["Aiko75", "Trần Nhân", "Portfolio", "National Economics University", "NEU", "Software Engineer", "Blue Archive", "Aniko", "RAG", "Vector Search", "Otaku Portfolio"],
  authors: [{ name: "Trần Nhân", url: "https://github.com/Aiko75" }],
  openGraph: {
    title: "Aiko.OS // Trần Nhân - Software Engineer & Researcher",
    description: "Cổng thông tin và hồ sơ cá nhân của Trần Nhân (Aiko75) - Kỹ sư Phần mềm, Nhà nghiên cứu tại NEU và Otaku.",
    url: "https://github.com/Aiko75",
    siteName: "Aiko.OS",
    locale: "vi_VN",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html lang="vi" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {children}
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}


