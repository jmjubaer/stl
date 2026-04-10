import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { RiFolderAddLine } from "react-icons/ri";
import AddBookmarkForm from "./Bookmark/AddBookmarkForm";
import AddFolderForm from "./folder/AddFolderForm";
import { useAppDispatch } from "@/src/redux/hook";
import {
    openBookmarkModal,
    openFolderModal,
} from "@/src/redux/features/modal/modalSlice";
import { TTag } from "@/src/types/Tag.type";
import { TFolder } from "@/src/types";
type TProps = {
    tagList: TTag[];
    folderList: TFolder[];

    setRefetchFolder: React.Dispatch<React.SetStateAction<number>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
    setRefetchTags: React.Dispatch<React.SetStateAction<number>>;
};
const AddButton = ({
    tagList,
    folderList,
    setRefetchTags,
    setRefetchFolder,
    setRefetchBookmark,
}: TProps) => {
    const dispatch = useAppDispatch();
    const [isOpenOption, setIsOpenOption] = useState(false);

    const handleOpenLinkModal = () => {
        dispatch(openBookmarkModal());
        setIsOpenOption(false);
    };
    const handleOpenFolderModal = () => {
        dispatch(openFolderModal());
        setIsOpenOption(false);
    };

    // Close dropdown when clicking outside
    const optionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                optionRef.current &&
                !optionRef.current.contains(e.target as Node)
            ) {
                setIsOpenOption(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div
            className='w-fit h-fit fixed xs:bottom-5 bottom-16 right-2 xs:right-5'
            ref={optionRef}>
            <button
                onClick={() => setIsOpenOption(!isOpenOption)}
                className='xs:px-4 xs:py-4 px-3 py-3 cursor-pointer rounded-full hover:bg-primary dark:bg-primary text-white bg-black transition-colors'>
                <FaPlus className='sm:text-2xl xs:text-xl' />
            </button>
            {isOpenOption && (
                <div className=' absolute xs:bottom-16 bottom-14 right-2 z-20 '>
                    <button
                        onClick={handleOpenLinkModal}
                        className='text-left py-2 px-3 bg-primary shadow-2xl w-40 hover:bg-primary text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/20 z-50'>
                        <LuLink className='text-xl' />
                        Add Bookmark
                    </button>{" "}
                    <button
                        onClick={handleOpenFolderModal}
                        className=' text-left py-2 px-3 bg-primary shadow-2xl w-40 hover:bg-primary text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/20 z-20 mt-5'>
                        <RiFolderAddLine className='text-xl' /> Create Folder
                    </button>{" "}
                </div>
            )}
            {/* Add Link Modal  */}
            <AddBookmarkForm
                folderList={folderList}
                tagList={tagList}
                setRefetchTags={setRefetchTags}
                setRefetchBookmark={setRefetchBookmark}
            />
            <AddFolderForm
                setRefetchFolder={setRefetchFolder}
                setRefetchBookmark={setRefetchBookmark}
            />
        </div>
    );
};

export default AddButton;
