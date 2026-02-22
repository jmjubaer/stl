"use client";
import Image from "next/image";
import { FaChevronDown, FaRegFolderOpen } from "react-icons/fa";
import folder from "@/src/assets/folder.png";
import { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
type TProps = {
    setIsOpenFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const FolderDropdown = ({ setIsOpenFolderModal }: TProps) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectFolder, setSelectFolder] = useState<string>("No Folder");
    const handleSelectFolder = (folder: string) => {
        setSelectFolder(folder);
        setOpenDropdown(false);
    };
    const handleOpenNewFolder = () => {
        setIsOpenFolderModal(true);
        setOpenDropdown(false);
    };
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
                    <div className='flex items-center gap-2 w-full cursor-pointer font-medium'>
                        {!(selectFolder === "No Folder") ? (
                            <Image
                                src={folder}
                                alt='Folder image'
                                width={20}
                                height={20}
                                className={``}
                            />
                        ) : (
                            <FaRegFolderOpen className='text-xl' />
                        )}
                        <span>{selectFolder}</span>
                    </div>
                }
                <FaChevronDown />

                {/* Dropdown */}
            </button>
            {openDropdown && (
                <div className=' text-sm absolute top-20 left-0 bg-background w-full border border-text rounded-2xl shadow p-1'>
                    <button
                        onClick={handleOpenNewFolder}
                        type='button'
                        className='flex items-center px-4 py-2 hover:bg-primary rounded-2xl hover:text-white gap-2 w-full cursor-pointer'>
                        <FaCheck className={`mr-2 invisible `} />
                        <MdCreateNewFolder className='text-2xl' />
                        <span> New Folder</span>
                    </button>
                    <button
                        onClick={() => handleSelectFolder("No Folder")}
                        type='button'
                        className='flex items-center px-4 py-2 hover:bg-primary rounded-2xl hover:text-white gap-2 w-full cursor-pointer'>
                        <FaCheck
                            className={`mr-2 ${
                                selectFolder === "No Folder"
                                    ? "block"
                                    : "invisible"
                            }`}
                        />
                        <FaRegFolderOpen className='text-2xl' />
                        <span>No Folder</span>
                    </button>
                    <button
                        onClick={() => handleSelectFolder("Work")}
                        type='button'
                        className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                        <FaCheck
                            className={`mr-2 ${
                                selectFolder === "Work" ? "block" : "invisible"
                            }`}
                        />
                        <Image
                            src={folder}
                            alt='Folder image'
                            width={25}
                            height={20}
                            className={``}
                        />
                        <span>Work</span>
                    </button>
                    <button
                        onClick={() => handleSelectFolder("Design")}
                        type='button'
                        className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                        <FaCheck
                            className={`mr-2 ${
                                selectFolder === "Design"
                                    ? "block"
                                    : "invisible"
                            }`}
                        />
                        <Image
                            src={folder}
                            alt='Folder image'
                            width={25}
                            height={20}
                            className={``}
                        />
                        <span>Design</span>
                    </button>
                    <button
                        onClick={() => handleSelectFolder("Tutorials")}
                        type='button'
                        className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                        <FaCheck
                            className={`mr-2 ${
                                selectFolder === "Tutorials"
                                    ? "block"
                                    : "invisible"
                            }`}
                        />
                        <Image
                            src={folder}
                            alt='Folder image'
                            width={25}
                            height={20}
                            className={``}
                        />
                        <span>Tutorials</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default FolderDropdown;
