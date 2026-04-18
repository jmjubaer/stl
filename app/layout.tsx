import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/shered/Navbar";
import MainProvider from "@/src/provider/MainProvider";
// import { AntdThemeProvider } from "@/src/provider/ThemeProvider";


export const metadata: Metadata = {
    title: "Save The Link",
    description: "This is a link saving application,  alternative to bookmark",
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
