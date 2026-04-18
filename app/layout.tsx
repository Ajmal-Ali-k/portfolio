import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajmal Ali K — Full Stack Developer",
  description: "Full Stack MERN Developer with 3+ years of experience. React, Next.js, Node.js, MongoDB. Based in Dubai, UAE. Open to remote and UAE roles.",
  keywords: ["Full Stack Developer", "MERN", "React", "Next.js", "Node.js", "Dubai", "UAE", "Remote"],
  authors: [{ name: "Ajmal Ali K" }],
  openGraph: {
    title: "Ajmal Ali K — Full Stack Developer",
    description: "Full Stack MERN Developer with 3+ years of experience building scalable web applications.",
    url: "https://ajmalalik.dev",
    siteName: "Ajmal Ali K",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
