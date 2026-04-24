import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/shered/Navbar";
import MainProvider from "@/src/provider/MainProvider";
// import { AntdThemeProvider } from "@/src/provider/ThemeProvider";

export const metadata: Metadata = {
    metadataBase: new URL("https://save-the-link.vercel.app"),
    title: {
        default: "STL — Save The Link",
        template: "STL — Save The Link",
    },
    description:
        "A smart bookmark manager to save, organize, and access your favorite links. Auto-fetch previews, organize with folders and tags, pin important links, and share collections instantly.",
    keywords: [
        "bookmark manager",
        "save links",
        "link organizer",
        "bookmark tool",
        "STL",
        "Save The Link",
        "url saver",
        "link manager",
        "bookmark organizer",
        "save website",
    ],
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
        shortcut: "/favicon.ico",
    },
    authors: [{ name: "Md Jubaer Jm", url: "https://jm-jubaer.vercel.app" }],
    creator: "Md Jubaer Jm",
    publisher: "STL",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://save-the-link.vercel.app",
        siteName: "STL — Save The Link",
        title: "STL — Save The Link",
        description:
            "Save, organize, and access your favorite links from anywhere. Auto-fetch previews, organize with folders and tags.",
        images: [
            {
                url: "/og-image.png", // 1200x630px
                width: 1200,
                height: 630,
                alt: "STL — Save The Link",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "STL — Save The Link",
        description:
            "A smart bookmark manager for saving and organizing your favorite links.",
        images: ["/og-image.png"],
        creator: "@yourtwitter",
    },
    alternates: {
        canonical: "https://save-the-link.vercel.app",
    },
    verification: {
        google: "r0SjLJopHTkZuXCnM_EzVbL23Lxjfx21S35_-yQTU-k", // from Google Search Console
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <MainProvider>
                <body className={`bg-background text-text`}>
                    <Navbar />
                    <main className='min-h-screen'>{children}</main>
                </body>
            </MainProvider>
        </html>
    );
}
