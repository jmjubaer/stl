"use client";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckSquare, FaRegFolderOpen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDriveFileMoveOutline } from "react-icons/md";
import folder from "@/src/assets/folder.png";
import Image from "next/image";
type TProps = {
    selectLink: string[];
    setSelectLink: React.Dispatch<React.SetStateAction<string[]>>;
};
const SelectLinkControl = ({ selectLink, setSelectLink }: TProps) => {
    const [openFolderSelect, setOpenFolderSelect] = useState<boolean>(false);
    const folderRef = useRef<HTMLDivElement>(null);
    const handleRemoveSelectLink = () => {
        setSelectLink([]);
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
        return () => document.removeEventListener("mousedown", handleOutSideClick);
    }, []);
    return (
        <div ref={folderRef}>
            {selectLink?.length > 0 && (
                <div className='fixed bottom-5 left-1/2 -translate-x-1/2 bg-background shadow-2xl border border-text/50 rounded-full py-2 px-5 text-sm flex items-center gap-3 z-10'>
                    <button className='flex items-center gap-1 cursor-pointer border-r pr-3'>
                        <FaRegCheckSquare className='text-lg' />
                        <span>{selectLink?.length}</span> Selected
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
                        <button className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                            <Image
                                src={folder}
                                alt='Folder image'
                                width={25}
                                height={20}
                                className={``}
                            />
                            <span>Work</span>
                        </button>
                        <button className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
                            <Image
                                src={folder}
                                alt='Folder image'
                                width={25}
                                height={20}
                                className={``}
                            />
                            <span>Design</span>
                        </button>
                        <button className='flex items-center px-4 py-2 hover:bg-primary rounded-full hover:text-white gap-2 w-full cursor-pointer'>
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
                </div>
            )}
        </div>
    );
};

export default SelectLinkControl;
