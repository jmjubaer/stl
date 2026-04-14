import Folder from "@/src/components/pages/Folder/Folder";
import { getShareFolder } from "@/src/services/FolderServices";

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
