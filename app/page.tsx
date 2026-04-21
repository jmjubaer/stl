import MainSection from "@/src/components/pages/home/MainSection";
import AddTagForm from "@/src/components/ui/Bookmark/AddTagForm";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "STL — Save The Link | Smart Bookmark Manager",
    description:
        "Save any URL with auto-fetched previews, organize with folders and tags, pin important links, and share collections. The smartest bookmark manager for the web.",
};
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "STL — Save The Link",
    url: "https://save-the-link.vercel.app",
    description:
        "A smart bookmark manager to save, organize, and access your favorite links.",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    featureList: [
        "Save links with auto-fetched previews",
        "Organize with folders and tags",
        "Pin important bookmarks",
        "Share collections",
        "Advanced search and filtering",
    ],
};
const MainPage = () => {
    return (
        <>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <MainSection />

            {/* Common Modal */}
            <AddTagForm />
        </>
    );
};

export default MainPage;
