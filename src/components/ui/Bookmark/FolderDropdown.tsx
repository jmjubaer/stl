"use client";
import Image from "next/image";
import { FaChevronDown, FaRegFolderOpen } from "react-icons/fa";
import folderImage from "@/src/assets/folder.png";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
import { useAppDispatch } from "@/src/redux/hook";
import { openFolderModal } from "@/src/redux/features/modal/modalSlice";
import { TFolder, TSelectedFolder } from "@/src/types";
type TProps = {
    folderList: TFolder[];
    selectFolder: TSelectedFolder;
    setSelectFolder: React.Dispatch<React.SetStateAction<TSelectedFolder>>;
};

const FolderDropdown = ({
    folderList,
    selectFolder,
    setSelectFolder,
}: TProps) => {
    const dispatch = useAppDispatch();
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleSelectFolder = (folder: TSelectedFolder) => {
        setSelectFolder(folder);
        setOpenDropdown(false);
    };
    const handleOpenNewFolder = () => {
        dispatch(openFolderModal());
        setOpenDropdown(false);
    };

    // Close dropdown when clicking outside
    const folderRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                folderRef.current &&
                !folderRef.current.contains(e.target as Node)
            ) {
                setOpenDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className='mt-5 relative'>
            <label className='block mb-2 font-medium text-text/80'>
                Folder :
            </label>
            <button
                type='button'
                onClick={() => setOpenDropdown(!openDropdown)}
                className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0  flex items-center justify-between`}>
                {
                    <div className='flex items-center gap-2 capitalize w-full cursor-pointer font-medium'>
                        {!(selectFolder.name === "No Folder") ? (
                            <Image
                                src={folderImage}
                                alt='Folder image'
                                width={20}
                                height={20}
                                className={``}
                            />
                        ) : (
                            <FaRegFolderOpen className='text-xl' />
                        )}
                        <span>{selectFolder.name}</span>
                    </div>
                }
                <FaChevronDown />

                {/* Dropdown */}
            </button>
            {openDropdown && (
                <div
                    ref={folderRef}
                    className=' text-sm absolute top-20 left-0 bg-background w-full border border-text rounded-2xl shadow p-1 z-10 max-h-40 overflow-y-auto'>
                    <button
                        onClick={handleOpenNewFolder}
                        type='button'
                        className='flex items-center px-4 py-2 hover:bg-primary rounded-2xl hover:text-white gap-2 w-full cursor-pointer'>
                        <FaCheck className={`mr-2 invisible `} />
                        <MdCreateNewFolder className='text-2xl' />
                        <span> New Folder</span>
                    </button>

                    <button
                        onClick={() =>
                            handleSelectFolder({ name: "No Folder", id: "" })
                        }
                        type='button'
                        className='flex items-center px-4 py-2 hover:bg-primary rounded-2xl hover:text-white gap-2 w-full cursor-pointer'>
                        <FaCheck
                            className={`mr-2 ${
                                selectFolder.name === "No Folder"
                                    ? "block"
                                    : "invisible"
                            }`}
                        />
                        <FaRegFolderOpen className='text-2xl' />
                        <span>No Folder</span>
                    </button>

                    {folderList.map((folder) => (
                        <button
                            key={folder._id}
                            onClick={() =>
                                handleSelectFolder({
                                    name: folder.name,
                                    id: folder._id,
                                })
                            }
                            type='button'
                            className='flex items-center capitalize px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                            <FaCheck
                                className={`mr-2 ${
                                    selectFolder.name === folder.name
                                        ? "block"
                                        : "invisible"
                                }`}
                            />
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
            )}
        </div>
    );
};

export default FolderDropdown;
