import { siteConfig } from "@/constants/site";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codertushar.in"),

  title: {
    default: siteConfig.title,
    template: `%s | Coder Tushar`,
  },

  description: siteConfig.description,

  applicationName: "Coder Tushar",

  authors: [
    {
      name: "Tushar Kumar Sahu",
    },
  ],

  creator: "Tushar Kumar Sahu",

  keywords: [
    "Coder Tushar",
    "Programming",
    "Web Development",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "C Programming",
    "C++",
    "Python",
    "Programming Roadmaps",
    "Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codertushar.in",
    siteName: "Coder Tushar",
    title: siteConfig.title,
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  // images: ["/og-image.jpg"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
        <GoogleAnalytics gaId="G-QE3RZQ9D89" />
        <SpeedInsights />
      </body>
    </html>
  );
}
