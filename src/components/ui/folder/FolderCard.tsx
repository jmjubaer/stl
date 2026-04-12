import Image from "next/image";
import folder from "@/src/assets/folder.png";
import OptionDropdown from "./OptionDropdown";
import { TFolder } from "@/src/types";
type TProps = {
    layout: "grid" | "list";
    columns: number;
    data: TFolder;
    setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
    setSelectedFolderName: React.Dispatch<React.SetStateAction<string>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
};
const FolderCard = ({
    columns,
    data,
    setSelectedFolder,
    setRefetchBookmark,
    setSelectedFolderName,
}: TProps) => {
    return (
        <div
            className={`rounded-lg border border-text/20 relative flex items-center justify-between  ${columns === 4 ? "sm:pr-2 pr-1" : columns === 3 ? "pr-2 flex-col sm:flex-row text-center sm:text-left relative" : "pr-2"}`}>
            <div
                onClick={() => {
                    setSelectedFolder(data?._id);
                    setSelectedFolderName(data?.name || "");
                }}
                className={`flex cursor-pointer  w-full items-center ${columns === 4 ? "lg:gap-3 gap-2" : columns === 3 ? "gap-2 flex-col sm:flex-row" : columns === 2 ? "gap-1 xs:gap-3" : "gap-3"} ${columns === 4 ? "sm:p-2 p-1" : columns === 3 ? "p-2" : "p-2"}`}>
                <Image
                    src={folder}
                    alt='Folder image'
                    width={50}
                    height={50}
                    className={` ${columns === 2 ? "w-10 xs:w-14" : ""}`}
                />
                <div className=''>
                    <h3
                        className={`font-semibold text-text/80 capitalize ${columns === 4 ? "lg:text-sm text-xs" : "md:text-sm text-xs"} `}>
                        {data.name}
                    </h3>
                    <p className='md:text-sm text-xs text-text/70'>
                        <span>{data?.bookmarks?.length || 0}</span> items
                    </p>
                </div>
            </div>

            <OptionDropdown
            data={data}
                setRefetchBookmark={setRefetchBookmark}
                columns={columns}
            />
        </div>
    );
};

export default FolderCard;
