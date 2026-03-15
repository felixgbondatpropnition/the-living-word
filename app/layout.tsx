import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Living Word — A Guide to Scripture",
  description:
    "A premium, interactive guide to understanding, navigating and falling in love with reading the Bible. Explore all 66 books, discover reading plans, and find Scripture for every season of life.",
  keywords: [
    "Bible guide",
    "Scripture",
    "Bible reading plan",
    "66 books of the Bible",
    "Bible study",
    "devotional",
  ],
  openGraph: {
    title: "The Living Word — A Guide to Scripture",
    description:
      "A premium, interactive guide to understanding and reading the Bible.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Living Word — A Guide to Scripture",
    description:
      "A premium, interactive guide to understanding and reading the Bible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-cream text-ink dark:bg-ink dark:text-cream">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
