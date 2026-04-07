"use client";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckSquare, FaRegFolderOpen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDriveFileMoveOutline } from "react-icons/md";
import folderImage from "@/src/assets/folder.png";
import Image from "next/image";
import { TFolder } from "@/src/types";
import { RiFolderAddLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { openFolderModal } from "@/src/redux/features/modal/modalSlice";
import ShowAlert from "@/src/utils/ShowAlert";
import Swal from "sweetalert2";
import { AddToFolder } from "@/src/services/BookmarkServices";
import { selectToken } from "@/src/redux/features/auth/authSlice";
type TProps = {
    folderList: TFolder[];
    selectBookmark: string[];
    setSelectBookmark: React.Dispatch<React.SetStateAction<string[]>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
};
const SelectBookmarkControl = ({
    folderList,
    selectBookmark,
    setSelectBookmark,
    setRefetchBookmark,
}: TProps) => {
    const token = useAppSelector(selectToken);
    const [openFolderSelect, setOpenFolderSelect] = useState<boolean>(false);
    const folderRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const handleRemoveSelectLink = () => {
        setSelectBookmark([]);
        setOpenFolderSelect(false);
    };
    useEffect(() => {
        const handleOutSideClick = (e: MouseEvent) => {
            if (
                folderRef.current &&
                !folderRef.current.contains(e.target as Node)
            ) {
                setOpenFolderSelect(false);
            }
        };
        document.addEventListener("mousedown", handleOutSideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutSideClick);
    }, []);
    const handleMoveToFolder = async (folderId: string) => {
        try {
            Swal.showLoading();
            const res = await AddToFolder(token as string, {
                bookmarkIds: selectBookmark,
                folderId,
            });
            if (res.success) {
                ShowAlert("Success", "success", "Move to folder successfully");
                setOpenFolderSelect(false);
                setSelectBookmark([]);
                setRefetchBookmark((prev) => prev + 1);
            } else {
                ShowAlert("Error", "error", res.message);
            }
        } catch (error) {
            ShowAlert(
                "Error",
                "error",
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
            );
        }
    };
    return (
        <div ref={folderRef}>
            {selectBookmark?.length > 0 && (
                <div className='fixed bottom-5 left-1/2 -translate-x-1/2 bg-background shadow-2xl border border-text/50 rounded-full py-2 px-5 text-sm flex items-center gap-3 z-10'>
                    <button className='flex items-center gap-1 cursor-pointer border-r pr-3'>
                        <FaRegCheckSquare className='text-lg' />
                        <span>{selectBookmark?.length}</span> Selected
                    </button>
                    <button
                        onClick={() => setOpenFolderSelect(!openFolderSelect)}
                        className='flex items-center gap-1 cursor-pointer text-blue-600'>
                        <MdDriveFileMoveOutline className='text-xl mb-0.5' />
                        <span className='whitespace-nowrap'>
                            Move to Folder
                        </span>
                    </button>
                    <button
                        onClick={handleRemoveSelectLink}
                        className=' cursor-pointer'>
                        <IoMdClose className='text-lg' />
                    </button>
                </div>
            )}
            {openFolderSelect && (
                <div className='fixed bottom-16 left-1/2 -translate-x-1/2 border border-text/40 rounded-2xl text-sm z-10 w-60 bg-background shadow'>
                    <h2 className='font-semibold text-center border-b border-text/20 dark:border-text/50 py-1.5 '>
                        Choose destination
                    </h2>
                    <div className='m-2 text-sm'>
                        <button className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                            <FaRegFolderOpen className='text-2xl' />
                            <span>Uncategorized</span>
                        </button>
                        <button
                            onClick={() => dispatch(openFolderModal())}
                            className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                            <RiFolderAddLine className='text-2xl' />
                            <span>New Folder</span>
                        </button>{" "}
                        {folderList.map((folder) => (
                            <button
                                onClick={() => handleMoveToFolder(folder._id)}
                                key={folder._id}
                                className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                                <Image
                                    src={folderImage}
                                    alt='Folder image'
                                    width={25}
                                    height={20}
                                    className={``}
                                />
                                <span>{folder.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectBookmarkControl;
