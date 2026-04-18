import MainSection from "@/src/components/pages/home/MainSection";
import AddTagForm from "@/src/components/ui/Bookmark/AddTagForm";

const MainPage = () => {
    return (
        <>
            <MainSection />

            {/* Common Modal */}
            <AddTagForm />
        </>
    );
};

export default MainPage;
