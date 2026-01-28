"use client";
import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import TagDropdown from "../../ui/TagDropdown";
import SortDropdown from "../../ui/SortDropdoen";
import { TTag } from "@/src/types";
import LinkCard from "../../ui/LinkCard";
const MainSection = () => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
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
            <div className=' py-3 shadow-sm dark:shadow-md dark:shadow-text/10'>
                <div className='flex items-center justify-between container'>
                    <div className='flex items-center gap-4'>
                        {/* Search bar */}
                        <div className='relative'>
                            <FaSearch className='absolute top-3 left-3 text-text/50' />
                            <input
                                type='search'
                                placeholder='Search for products...'
                                className='px-4 py-1.5 border border-text/20 rounded-xl w-80 outline-none pl-9'
                            />
                        </div>
                        {/* Tag filter */}
                        <TagDropdown tag={tag} setTag={setTag} />
                        {/* Sort by */}
                        <SortDropdown sortby={sortby} setSortby={setSortby} />
                    </div>
                    {/* Grid change section */}
                    <div className=''>
                        <button
                            onClick={() => setLayout("list")}
                            className={`px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                                layout === "list" &&
                                "bg-text text-background border-text"
                            }`}>
                            <FaList />
                        </button>
                        <button
                            onClick={() => setLayout("grid")}
                            className={`px-5 border py-2 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                                layout === "grid" &&
                                "bg-text text-background border-text"
                            }`}>
                            <IoGrid className='tex' />
                        </button>
                    </div>
                </div>
            </div>
            {/* Show Filter Tag */}
            <div
                className={`pt-3 flex items-center gap-2 container ${
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
                className={` grid-cols-3 gap-5 my-5 container ${layout === "grid" ? "grid" : "block"}`}>
                {/* card */}
                <LinkCard tagList={tagList} layout={layout} />
            </div>
        </section>
    );
};

export default MainSection;
