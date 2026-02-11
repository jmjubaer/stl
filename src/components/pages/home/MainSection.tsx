"use client";
import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import TagDropdown from "../../ui/TagDropdown";
import SortDropdown from "../../ui/SortDropdoen";
import { TTag } from "@/src/types";
import LinkCard from "../../ui/LinkCard";
import { LuColumns2, LuColumns3, LuColumns4 } from "react-icons/lu";
import { PiTextColumnsBold } from "react-icons/pi";
import { TfiLayoutColumn4Alt } from "react-icons/tfi";
const MainSection = () => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [columns, setColumns] = useState<number>(3);
    const [tag, setTag] = useState<TTag[]>([]);
    const [sortby, setSortby] = useState<string>("Newest First");
    const tagList = [
        { name: "Design", color: "#9952E0" },
        { name: "Development", color: "#1A8CFF" },
        { name: "Tutorial", color: "#28BD66" },
        { name: "Marketing", color: "#F97A1F" },
        { name: "Inspiration", color: "#1DBAC9" },
    ];
    return (
        <section className=''>
            {/* Filter section likely section header */}
            <div
                className='md:py-3 py-2 shadow-sm dark:shadow-md dark:shadow-text/10 sticky
         top-0 z-50 bg-background'>
                <div className='flex flex-wrap items-center gap-2 md:gap-3 justify-center lg:justify-between container'>
                    <div className='flex items-center gap-2 sm:gap-3'>
                        {/* Search bar */}
                        <div className='relative'>
                            <FaSearch className='absolute text-sm sm:text-base top-2.5   sm:top-3 left-3 text-text/50' />
                            <input
                                type='search'
                                placeholder='Search for products...'
                                className='sm:px-4 px-3 py-1 sm:py-1.5 border border-text/20 sm:rounded-xl rounded-md w-full sm:w-80 outline-none pl-8 sm:pl-9'
                            />
                        </div>
                        {/* Tag filter */}
                        <TagDropdown tag={tag} setTag={setTag} />
                        {/* Sort by */}
                        <SortDropdown sortby={sortby} setSortby={setSortby} />
                    </div>
                    {/* grid control section */}
                    <div className='flex gap-3'>
                        {/* Grid change section */}
                        <div className=''>
                            <button
                                onClick={() => {
                                    setLayout("list");
                                    setColumns(1);
                                }}
                                className={`px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                                    layout === "list" &&
                                    "bg-text text-background border-text"
                                }`}>
                                <FaList />
                            </button>
                            <button
                                onClick={() => {
                                    setLayout("grid");
                                    setColumns(3);
                                }}
                                className={`px-5 border py-2 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                                    layout === "grid" &&
                                    "bg-text text-background border-text"
                                }`}>
                                <IoGrid className='tex' />
                            </button>
                        </div>

                        {/* Grid column quantity change section */}
                        {layout === "grid" ? (
                            <div className=''>
                                <button
                                    onClick={() => setColumns(2)}
                                    className={`px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                                        columns === 2 &&
                                        "bg-text text-background border-text"
                                    }`}>
                                    <LuColumns2 />
                                </button>
                                <button
                                    onClick={() => setColumns(3)}
                                    className={`px-5 border py-2 hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                                        columns === 3 &&
                                        "bg-text text-background border-text"
                                    }`}>
                                    <LuColumns3 className='tex' />
                                </button>
                                <button
                                    onClick={() => setColumns(4)}
                                    className={`px-5 border py-2 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                                        columns === 4 &&
                                        "bg-text text-background border-text"
                                    }`}>
                                    <LuColumns4 className='tex' />
                                </button>
                            </div>
                        ) : (
                            <div className='flex'>
                                <button
                                    onClick={() => setColumns(1)}
                                    className={`px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                                        columns === 1 &&
                                        "bg-text text-background border-text"
                                    }`}>
                                    <TfiLayoutColumn4Alt className='rotate-90' />
                                </button>
                                <button
                                    onClick={() => setColumns(2)}
                                    className={`px-4 border py-1 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                                        columns === 2 &&
                                        "bg-text text-background border-text"
                                    }`}>
                                    <PiTextColumnsBold className='text-2xl' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Show Filter Tag */}
            <div
                className={`pt-3 flex flex-wrap items-center gap-2 container ${
                    tag.length > 0 ? "block" : "hidden"
                }`}>
                {tag.map((tagItem) => (
                    <span
                        key={tagItem.name}
                        style={{
                            backgroundColor: tagItem.color + "20",
                            color: tagItem.color,
                        }}
                        className={`p-1 text-xs font-bold px-3  rounded-full flex items-center gap-1`}>
                        {tagItem.name}
                        <button
                            onClick={() =>
                                setTag((prvTag) =>
                                    prvTag.filter(
                                        (t) => t.name !== tagItem.name,
                                    ),
                                )
                            }
                            className='cursor-pointer'>
                            <FaTimes />
                        </button>
                    </span>
                ))}
            </div>
            {/* Link Card section` */}
            <div
                className={`grid gap-2 md:gap-3 my-5 container  ${
                    columns === 1
                        ? "grid-cols-1"
                        : columns === 2
                          ? "grid-cols-2"
                          : columns === 3
                            ? "grid-cols-3"
                            : "grid-cols-4"
                }`}>
                {/* card */}
                <LinkCard columns={columns} tagList={tagList} layout={layout} />
                <LinkCard columns={columns} tagList={tagList} layout={layout} />
                <LinkCard columns={columns} tagList={tagList} layout={layout} />
                <LinkCard columns={columns} tagList={tagList} layout={layout} />
                <LinkCard columns={columns} tagList={tagList} layout={layout} />
            </div>
        </section>
    );
};

export default MainSection;
