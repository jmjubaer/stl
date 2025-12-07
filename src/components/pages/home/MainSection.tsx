"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import TagDropdown from "../../ui/TagDropdown";
import SortDropdown from "../../ui/SortDropdoen";

const MainSection = () => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [tag, setTag] = useState<string[]>([]);
    const [sortby, setSortby] = useState<string>("Newest First");

    return (
        <section className=''>
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
                            className={`px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer ${
                                layout === "list" &&
                                "bg-text text-background border-text"
                            }`}>
                            <FaList />
                        </button>
                        <button
                            onClick={() => setLayout("grid")}
                            className={`px-5 border py-2 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer ${
                                layout === "grid" &&
                                "bg-text text-background border-text"
                            }`}>
                            <IoGrid className='tex' />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
