import Folder from "@/src/components/pages/Folder/Folder";
import { getShareFolder } from "@/src/services/FolderServices";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Share Folder | STL — Save The Link",
    description:
        "Manage and organize a group of bookmarks in one place and share with anyone.",
    robots: {
        index: true,
        follow: true,
    },
};
const FolderPage = async ({ params }: { params: { folderId: string } }) => {
    const { folderId } = await params;
    const folder = await getShareFolder(folderId);
    return (
        <div>
            <Folder data={folder.data} />
        </div>
    );
};

export default FolderPage;
