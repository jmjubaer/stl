"use client";
import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaAngleRight, FaFolder, FaList } from "react-icons/fa6";
import { IoGrid, IoHomeOutline } from "react-icons/io5";
import TagDropdown from "../../ui/TagDropdown";
import SortDropdown from "../../ui/SortDropdoen";
import { TTag } from "@/src/types";
import LinkCard from "../../ui/LInk/LinkCard";
import { LuColumns2, LuColumns3, LuColumns4 } from "react-icons/lu";
import { PiTextColumnsBold } from "react-icons/pi";
import { TfiAngleRight, TfiLayoutColumn4Alt } from "react-icons/tfi";
import { TbColumns1 } from "react-icons/tb";
import FolderCard from "../../ui/folder/FolderCard";
import AddButton from "../../ui/AddButton";
import SelectLinkControl from "../../ui/LInk/SelectLinkControl";
import TopNav from "../../shered/TopNav";
import LayoutControl from "../../shered/LayoutControl";
const MainSection = () => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [columns, setColumns] = useState<number>(3);
    const [selectLink, setSelectLink] = useState<string[]>([]);
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
            {/* Top Navigation */}
            <div className='mt-2'>
                <TopNav folderName='Development' />
            </div>

            {/* Filter section likely section header */}
            <div className='md:py-3 py-2 shadow-sm dark:shadow-md dark:shadow-text/10 bg-background'>
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

                    {/* Layout control section */}

                    <LayoutControl
                        columns={columns}
                        layout={layout}
                        setColumns={setColumns}
                        setLayout={setLayout}
                    />
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

            {/* Folder Section  */}
            <div className='container my-2'>
                <h2 className='text-text/50 uppercase text-lg font-bold mb-2'>
                    Folders
                </h2>
                <div
                    className={`grid gap-2 md:gap-3 ${
                        columns === 1
                            ? "grid-cols-1"
                            : columns === 2
                              ? "grid-cols-2"
                              : columns === 3
                                ? "grid-cols-3"
                                : "grid-cols-4"
                    }`}>
                    <FolderCard columns={columns} layout={layout} />
                    <FolderCard columns={columns} layout={layout} />
                    <FolderCard columns={columns} layout={layout} />
                    <FolderCard columns={columns} layout={layout} />
                </div>
            </div>
            {/* bookmark section` */}
            <div className='container my-2'>
                <h2 className='text-text/50 uppercase text-lg font-bold mb-2'>
                    Bookmarks
                </h2>
                <div
                    className={`grid gap-2 md:gap-3 ${
                        columns === 1
                            ? "grid-cols-1"
                            : columns === 2
                              ? "grid-cols-2"
                              : columns === 3
                                ? "grid-cols-3"
                                : "grid-cols-4"
                    }`}>
                    {/* card */}
                    <LinkCard
                        columns={columns}
                        tagList={tagList}
                        layout={layout}
                        selectLink={selectLink}
                        setSelectLink={setSelectLink}
                    />{" "}
                    <LinkCard
                        columns={columns}
                        tagList={tagList}
                        layout={layout}
                        selectLink={selectLink}
                        setSelectLink={setSelectLink}
                    />{" "}
                    <LinkCard
                        columns={columns}
                        tagList={tagList}
                        layout={layout}
                        selectLink={selectLink}
                        setSelectLink={setSelectLink}
                    />{" "}
                    <LinkCard
                        columns={columns}
                        tagList={tagList}
                        selectLink={selectLink}
                        layout={layout}
                        setSelectLink={setSelectLink}
                    />
                </div>
            </div>

            {/* Card Select Option */}
            <SelectLinkControl
                selectLink={selectLink}
                setSelectLink={setSelectLink}
            />

            {/* Add button section */}
            <div className=''>
                <AddButton />
            </div>
        </section>
    );
};

export default MainSection;
