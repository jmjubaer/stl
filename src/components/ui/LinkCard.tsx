import Image from "next/image";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { FaCalendar, FaLink, FaRegCopy } from "react-icons/fa6";
import image from "@/src/assets/img_1.jpg";
import { TTag } from "@/src/types";
type TProps = {
    tagList: TTag[];
    layout: "grid" | "list";
    columns: number;
};
const LinkCard = ({ tagList, layout, columns }: TProps) => {
    return (
        <div
            className={`overflow-hidden rounded-xl border border-text/20 shadow-md dark:shadow-white/10 bg-white/50 dark:bg-background group ${layout === "list" ? "flex items-center p-4 gap-1 relative" : ""}`}>
            <div
                className={`overflow-hidden ${layout === "list" ? "rounded-lg" : "relative"}`}>
                <Image
                    src={image}
                    alt='Link image'
                    className={`group-hover:scale-110 transition-all duration-300 ${layout === "grid" && columns === 4 ? "h-44" : layout === "grid" ? "md:h-56 h-40" : layout === "list" && columns === 2 ? "h-20 w-28" : "h-24 w-fit"}`}
                />
                {/* Floating button section */}
                <div
                    className={`absolute p-3 flex items-center justify-between gap-1 md:gap-2  ${layout === "list" ? " top-0 right-0" : "bottom-0 left-0 w-full"}`}>
                    <div className='w-fit flex items-center gap-2 text-black'>
                        <button className='xs:px-4 px-1.5 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaLink
                                className={`inline  ${layout === "list" ? "text-lg" : "text-xl"}`}
                            />{" "}
                            <span
                                className={` text-sm ${layout === "list" || columns === 4 ? "hidden" : "md:inline  hidden"}`}>
                                Open
                            </span>
                        </button>{" "}
                        <button className='xs:px-4 px-2 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaRegCopy
                                className={`inline text-md ${layout === "list" ? "" : ""}`}
                            />{" "}
                            <span
                                className={` text-sm ${layout === "list" || columns === 4 ? "hidden" : "md:inline hidden"}`}>
                                Copy
                            </span>
                        </button>{" "}
                    </div>
                    <div className='flex items-center gap-2 e-fit text-black'>
                        <button className='xs:px-4 px-2 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaPenAlt
                                className={`inline ${layout === "list" ? "" : "sm:text-xl"}`}
                            />{" "}
                        </button>{" "}
                        <button className='xs:px-4 px-2 py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white'>
                            <FaTrashAlt
                                className={`inline ${layout === "list" ? "" : "sm:text-xl"}`}
                            />{" "}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`${layout === "list" ? "flex items-center justify-between w-full" : ""}`}>
                <div className='sm:p-3 p-1.5'>
                    <h2
                        className={` font-semibold line-clamp-1 ${(layout === "list" && columns === 2) || columns === 4 ? "text-md" : "xs:text-lg sm:text-xl"}`}
                        title=' Unsplash - Free Photos'>
                        Unsplash - Free Photos
                    </h2>
                    <p
                        className='xs:text-sm text-xs text-text/80 line-clamp-1'
                        title='Beautiful, free images and photos for any project. High
                        resolution.'>
                        Beautiful, free images and photos for any project. High
                        resolution.
                    </p>
                    <div className='flex items-center flex-wrap gap-1 md:gap-2 mt-1'>
                        {tagList.slice(1, 4).map((tagItem) => (
                            <span
                                key={tagItem.name}
                                style={{
                                    backgroundColor: tagItem.color + "20",
                                    color: tagItem.color,
                                }}
                                className={`sm:p-1 p-0.5 text-xs font-bold px-2.5 sm:px-3 text-center rounded-full flex items-center gap-1 justify-center ${layout === "list" ? "" : "w-full sm:w-fit"}`}>
                                {tagItem.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div
                    className={` border-text/10 flex items-center justify-between p-1.5 px-3 sm:p-3 ${layout === "list" ? "" : "border-t"}`}>
                    <h5
                        className={`flex items-center gap-1 sm:gap-2 text-sm text-text/70 ${layout === "list" ? "hidden" : ""}`}>
                        <FaCalendar className='text-xs' />
                        <span
                            className={`${(layout === "list" || columns === 4) && "hidden"}`}>
                            Created
                        </span>{" "}
                        Feb 5, 2024
                    </h5>
                    <h5 className='hidden md:flex items-center gap-2 text-sm text-text/70 whitespace-nowrap'>
                        <FaCalendar className='text-xs' />
                        <span
                            className={`${layout === "list" || (columns === 4 && "hidden")}`}>
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
