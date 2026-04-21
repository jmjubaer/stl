import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/shered/Navbar";
import MainProvider from "@/src/provider/MainProvider";
// import { AntdThemeProvider } from "@/src/provider/ThemeProvider";

// app/layout.tsx
export const metadata = {
    title: "STL — Save The Link",
    description:
        "A smart bookmark manager to save, organize, and access your favorite links. Auto-fetch previews, organize with folders and tags, pin important links, and share collections.",
    keywords: [
        "bookmark manager",
        "save links",
        "link organizer",
        "bookmark tool",
        "STL",
        "Save The Link",
    ],
    openGraph: {
        title: "STL — Save The Link",
        description:
            "Save, organize, and access your favorite links from anywhere.",
        url: "https://save-the-link.vercel.app",
        siteName: "STL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "STL — Save The Link",
        description:
            "A smart bookmark manager for saving and organizing links.",
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
