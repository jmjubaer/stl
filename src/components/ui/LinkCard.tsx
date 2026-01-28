import Image from "next/image";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { FaCalendar, FaCopy, FaLink, FaRegCopy } from "react-icons/fa6";
import image from "@/src/assets/img_1.jpg";
import { TTag } from "@/src/types";
type TProps = {
    tagList: TTag[];
    layout: "grid" | "list";
};
const LinkCard = ({ tagList, layout }: TProps) => {
    return (
        <div
            className={`overflow-hidden rounded-xl border border-text/20 shadow-md dark:shadow-white/10 bg-white/50 dark:bg-background group ${layout === "list" ? "flex items-center p-4 gap-1 relative" : ""}`}>
            <div
                className={`overflow-hidden ${layout === "list" ? "rounded-lg" : "relative"}`}>
                <Image
                    src={image}
                    alt='Link image'
                    className={`group-hover:scale-110 transition-all duration-300 ${layout === "grid" ? "h-56" : "h-24 w-fit"}`}
                />
                {/* Floating button section */}
                <div
                    className={`absolute p-3 flex items-center justify-between gap-2  ${layout === "list" ? " top-0 right-0" : "bottom-0 left-0 w-full"}`}>
                    <div className='w-fit flex items-center gap-2 text-black'>
                        <button className='px-4 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaLink
                                className={`inline  ${layout === "list" ? "text-lg" : "text-xl"}`}
                            />{" "}
                            <span
                                className={` text-sm ${layout === "list" ? "hidden" : "inline"}`}>
                                Open
                            </span>
                        </button>{" "}
                        <button className='px-4 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaRegCopy
                                className={`inline text-md ${layout === "list" ? "" : ""}`}
                            />{" "}
                            <span
                                className={` text-sm ${layout === "list" ? "hidden" : "inline"}`}>
                                Copy
                            </span>
                        </button>{" "}
                    </div>
                    <div className='flex items-center gap-2 e-fit text-black'>
                        <button className='px-4 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaPenAlt
                                className={`inline ${layout === "list" ? "" : "text-xl"}`}
                            />{" "}
                        </button>{" "}
                        <button className='px-4 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaTrashAlt
                                className={`inline ${layout === "list" ? "" : "text-xl"}`}
                            />{" "}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`${layout === "list" ? "flex items-center justify-between w-full" : ""}`}>
                <div className='p-3'>
                    <h2 className='text-xl font-semibold'>
                        Unsplash - Free Photos
                    </h2>
                    <p className='text-sm text-text/80'>
                        Beautiful, free images and photos for any project. High
                        resolution.
                    </p>
                    <div className='flex items-center flex-wrap gap-2  mt-1'>
                        {tagList.slice(1, 4).map((tagItem) => (
                            <span
                                key={tagItem.name}
                                style={{
                                    backgroundColor: tagItem.color + "20",
                                    color: tagItem.color,
                                }}
                                className={`p-1 text-xs font-bold px-3  rounded-full flex items-center gap-1`}>
                                {tagItem.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div
                    className={` border-text/10 flex items-center justify-between p-3 ${layout === "list" ? "" : "border-t"}`}>
                    <h5
                        className={`flex items-center gap-2 text-sm text-text/70 ${layout === "list" ? "hidden" : ""}`}>
                        <FaCalendar className='text-xs' />
                        Created Feb 5, 2024
                    </h5>
                    <h5 className='flex items-center gap-2 text-sm text-text/70'>
                        <FaCalendar className='text-xs' />
                        <span className={`${layout === "list" && "hidden"}`}>
                            Updated
                        </span>{" "}
                        Feb 5, 2024
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
