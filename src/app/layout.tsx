import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aryan Parikh | AI & Data Science Portfolio",
  description: "Computer Engineering student passionate about AI/ML, Data Science, and building intelligent systems. Explore my projects and skills.",
  keywords: ["Aryan Parikh", "AI", "Machine Learning", "Data Science", "Computer Engineering", "Python", "C++", "Portfolio"],
  authors: [{ name: "Aryan Parikh" }],
  openGraph: {
    title: "Aryan Parikh | AI & Data Science Portfolio",
    description: "Computer Engineering student passionate about AI/ML, Data Science, and building intelligent systems.",
    url: "https://aryanparikh.dev",
    siteName: "Aryan Parikh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Parikh | AI & Data Science Portfolio",
    description: "Computer Engineering student passionate about AI/ML, Data Science, and building intelligent systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
