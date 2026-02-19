import { useEffect, useRef, useState } from "react";
import { FaFolderPlus, FaPlus } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { LuLink } from "react-icons/lu";
import { MdAddLink, MdOutlineEdit } from "react-icons/md";
import { RiFolderAddLine } from "react-icons/ri";

const AddButton = () => {
    const [isOpenOption, setIsOpenOption] = useState(false);
    const optionRef = useRef<HTMLDivElement>(null);
    // Close dropdown when clicking outside
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
        <div className='w-fit h-fit fixed bottom-5 right-5' ref={optionRef}>
            <button
                onClick={() => setIsOpenOption(!isOpenOption)}
                className='px-4 py-4 cursor-pointer rounded-full hover:bg-primary text-white bg-black transition-colors'>
                <FaPlus className='sm:text-2xl text-xl' />
            </button>
            {isOpenOption && (
                <div className=' absolute bottom-16 right-2 z-10 '>
                    <button
                        // onClick={() => setIsOpen(!isOpen)}
                        className=' text-left py-2 px-3 bg-primary shadow-2xl w-40 hover:bg-primary text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/20'>
                        <RiFolderAddLine className='text-xl' /> Add Folder
                    </button>{" "}
                    <button
                        // onClick={() => setIsOpen(!isOpen)}
                        className='text-left py-2 px-3 bg-primary shadow-2xl w-40 hover:bg-primary text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/20 mt-5'>
                        <LuLink className='text-xl' /> Add Link
                    </button>{" "}
                </div>
            )}
        </div>
    );
};

export default AddButton;
