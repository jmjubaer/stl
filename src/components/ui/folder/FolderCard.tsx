import Image from "next/image";
import folder from "@/src/assets/folder.png";
import OptionDropdown from "./OptionDropdown";
type TProps = {
    layout: "grid" | "list";
    columns: number;
};
const FolderCard = ({ columns }: TProps) => {
    return (
        <div
            className={`cursor-pointer rounded-lg border border-text/20 relative flex items-center justify-between  ${columns === 4 ? "sm:p-2 p-1" : columns === 3 ? "p-2 flex-col sm:flex-row text-center sm:text-left relative" : "p-2"}`}>
            <div
                className={`flex items-center ${columns === 4 ? "lg:gap-3 gap-2" : columns === 3 ? "gap-2 flex-col sm:flex-row" : columns === 2 ? "gap-1 xs:gap-3" : "gap-3"}`}>
                <Image
                    src={folder}
                    alt='Folder image'
                    width={50}
                    height={50}
                    className={` ${columns === 2 ? "w-10 xs:w-auto" : ""}`}
                />
                <div className=''>
                    <h3
                        className={`font-semibold text-text/80 capitalize ${columns === 4 ? "lg:text-sm text-xs" : "md:text-sm text-xs"} `}>
                        Development
                    </h3>
                    <p className='md:text-sm text-xs text-text/70'>
                        <span>0</span> items
                    </p>
                </div>
            </div>
            <OptionDropdown columns={columns} />
        </div>
    );
};

export default FolderCard;
