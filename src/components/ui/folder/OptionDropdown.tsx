"use client";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

type TProps = {
    columns: number;
};
const OptionDropdown = ({ columns }: TProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className='relative' ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`cursor-pointer ${columns === 3 ? "sm:static absolute top-2 right-2" : ""}`}>
                <BsThreeDotsVertical />
            </button>
            {isOpen && (
                <div className='bg-background absolute top-5 right-0 rounded-lg shadow-lg p-1 w-40 z-10 border border-text/20'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center  gap-1'>
                        <IoIosShareAlt className='text-xl' /> Share
                    </button>{" "}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center  gap-1'>
                        <MdOutlineEdit className='text-xl' /> Rename
                    </button>{" "}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                       `` className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center gap-2.5'>
                        <FaTrashAlt className='text-md ' /> Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default OptionDropdown;
