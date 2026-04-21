/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import PhImage from "@/src/assets/bookmark-placeholder.png";
import { TBookmark } from "@/src/types";
import { MdUpdate } from "react-icons/md";
import { RiMenuAddLine } from "react-icons/ri";
import { LuExternalLink } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import pin from "@/src/assets/pin.png";
import { useState } from "react";
import Swal from "sweetalert2";
import ShowAlert from "@/src/utils/ShowAlert";
import {
    deleteBookmark,
    togglePinBookmark,
} from "@/src/services/BookmarkServices";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { selectToken, setIsExpired } from "@/src/redux/features/auth/authSlice";
import ShareModal from "../ShareModal";
import { IoIosShareAlt } from "react-icons/io";
type TProps = {
    layout: "grid" | "list";
    columns: number;
    selectBookmark?: string[];
    setSelectBookmark?: React.Dispatch<React.SetStateAction<string[]>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
    setSelectEditBookmark: React.Dispatch<
        React.SetStateAction<TBookmark | null>
    >;
    data: TBookmark;
    isPinned?: boolean;
};
const BookmarkCard = ({
    data,
    layout,
    columns,
    isPinned,
    selectBookmark,
    setSelectBookmark,
    setRefetchBookmark,
    setSelectEditBookmark,
}: TProps) => {
    const token = useAppSelector(selectToken);
    const dispatch = useAppDispatch();
    const [isOpenShareModal, setIsOpenShareModal] = useState(false);

    const handleSelectLink = (e: any) => {
        if (selectBookmark && setSelectBookmark) {
            if (e.target.checked) {
                setSelectBookmark([...selectBookmark, data._id]);
            } else {
                setSelectBookmark(
                    selectBookmark.filter((id) => id !== data._id),
                );
            }
        }
    };
    const handleOpenLink = () => {
        window.open(data.url, "_blank", "noopener,noreferrer");
    };
    const handleDeleteBookmark = () => {
        Swal.fire({
            title: "Warning",
            text: "Are you want to delete this bookmark?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteBookmark(token as string, data._id);
                    if (res.success) {
                        ShowAlert(
                            "Bookmark deleted!",
                            "success",
                            "Bookmark deleted successfully",
                        );
                        setRefetchBookmark((prev) => prev + 1);
                    } else {
                        if (res.message === "Token has expired") {
                            dispatch(setIsExpired());
                        } else {
                            ShowAlert(
                                "Error",
                                "error",
                                res.message || "Failed to delete bookmark",
                            );
                        }
                    }
                } catch (error) {
                    ShowAlert(
                        "Error",
                        "error",
                        error instanceof Error
                            ? error.message
                            : "An unknown error occurred",
                    );
                }
            }
        });
    };
    const handleUnPinBookmark = () => {
        Swal.fire({
            title: "Warning",
            text: "Are you want to unpin this bookmark?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Unpin",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await togglePinBookmark(token as string, {
                        bookmarkIds: [data._id],
                        isPinned: false,
                    });
                    if (res.success) {
                        ShowAlert(
                            "Success",
                            "success",
                            "Bookmark unpinned successfully",
                        );
                        setRefetchBookmark((prev) => prev + 1);
                    } else {
                        if (res.message === "Token has expired") {
                            dispatch(setIsExpired());
                        } else {
                            ShowAlert(
                                "Error",
                                "error",
                                res.message || "Failed to unpin bookmark",
                            );
                        }
                    }
                } catch (error) {
                    ShowAlert(
                        "Error",
                        "error",
                        error instanceof Error
                            ? error.message
                            : "An unknown error occurred",
                    );
                }
            }
        });
    };
    return (
        <>
            <div
                className={`overflow-hidden rounded-xl border border-text/20 shadow-md dark:shadow-white/10 bg-white/50 dark:bg-background group ${layout === "list" && columns === 2 ? "flex items-center p-2 sm:p-4 gap-0 xs:gap-2 relative" : layout === "list" ? "flex items-center p-2 sm:p-4 gap-2 relative" : ""}`}>
                <div
                    className={`overflow-hidden flex items-center gap-2 ${layout === "list" ? "" : "relative"}`}>
                    {isPinned ? (
                        <button
                            onClick={handleUnPinBookmark}
                            className={` z-10 w-8 shadow-3xl cursor-pointer  accent-primary text-red-500 ${columns === 3 ? "absolute top-2 left-0 sm:left-2" : layout === "list" && columns === 2 ? "sm:static absolute top-2 right-1" : layout === "list" ? "static " : "absolute top-2 left-2 "}`}>
                            <Image
                                src={pin}
                                alt='Pin'
                                width={16}
                                height={20}
                                className={` w-8 object-contain`}
                            />
                        </button>
                    ) : setSelectBookmark ? (
                        <input
                            onChange={(e) => handleSelectLink(e)}
                            type='checkbox'
                            checked={
                                selectBookmark?.includes(data._id) || false
                            }
                            className={` z-10 w-9 cursor-pointer accent-primary ${columns === 3 ? "absolute top-3 sm:top-5 left-0 sm:left-2 sm:scale-200 scale-150" : layout === "list" && columns === 2 ? "sm:static absolute top-4 right-1 sm:scale-170 scale-150" : layout === "list" ? "static sm:scale-200 scale-150" : "absolute top-4 left-1 sm:scale-200 scale-150"}`}
                        />
                    ) : (
                        ""
                    )}
                    <div
                        className={`overflow-hidden flex  ${layout === "list" ? "rounded-lg" : "relative"}`}>
                        {/* todo: alternatve image */}
                        <Image
                            src={data?.image || PhImage}
                            alt={data.title}
                            width={1000}
                            height={200}
                            className={`group-hover:scale-110 transition-all duration-300 ${layout === "grid" && columns === 4 ? "lg:h-36 h-28" : columns === 3 ? "md:h-44 h-32" : layout === "grid" ? "md:h-56 h-40" : layout === "list" && columns === 2 ? "h-20 w-28" : "xs:h-24 h-20 w-fit"}`}
                        />
                    </div>
                    {/* Floating button section */}
                    <div
                        className={`absolute p-1 flex items-center gap-1 md:gap-2  ${columns === 3 ? "flex-wrap-reverse md:flex-nowrap w-full h-4/5 sm:h-fit bottom-0 right-0 justify-center sm:justify-between" : layout === "list" && columns === 2 ? "bottom-0 sm:bottom-auto sm:top-0 right-0 w-full xs:w-fit justify-between" : layout === "list" ? " top-0 right-0 w-full xs:w-fit justify-between" : "bottom-0 left-0 w-full justify-between"}`}>
                        <div className='w-fit flex items-center gap-2 text-black'>
                            <button
                                onClick={handleOpenLink}
                                className={`py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white ${columns === 4 ? "px-1.5 lg:px-4" : columns === 3 ? "px-3" : "xs:px-4 px-1.5"}`}>
                                <LuExternalLink
                                    className={`inline  ${columns === 3 ? "text-lg sm:text-xl" : layout === "list" ? "text-lg" : "text-xl"}`}
                                />{" "}
                                <span
                                    className={` text-sm ${layout === "list" || columns === 4 ? "hidden" : columns === 3 ? "hidden lg:inline" : "md:inline  hidden"}`}>
                                    Open
                                </span>
                            </button>{" "}
                            <button
                                onClick={() => setIsOpenShareModal(true)}
                                className={`py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-1 bg-white ${columns === 4 ? "px-1.5 lg:px-4" : columns === 3 ? "px-3" : "xs:px-4 px-1.5"}`}>
                                <IoIosShareAlt
                                    className={`inline  ${columns === 3 ? "text-lg sm:text-xl" : layout === "list" ? "text-lg" : "text-xl"}`}
                                />{" "}
                                <span
                                    className={` text-sm ${layout === "list" || columns === 4 ? "hidden" : columns === 3 ? "hidden lg:inline" : "md:inline  hidden"}`}>
                                    Share
                                </span>
                            </button>{" "}
                        </div>
                        <div className='flex items-center gap-2 e-fit text-black'>
                            <button
                                onClick={() => setSelectEditBookmark(data)}
                                className={` py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white ${columns === 4 ? "px-1.5 lg:px-4" : columns === 3 ? "px-3" : "xs:px-4 px-1.5"}`}>
                                <FaPenAlt
                                    className={`inline ${layout === "list" ? "" : "sm:text-xl"}`}
                                />{" "}
                            </button>{" "}
                            <button
                                onClick={handleDeleteBookmark}
                                className={`py-1.5 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-2 bg-white ${columns === 4 ? "px-1.5 lg:px-4" : columns === 3 ? "px-3" : "xs:px-4 px-1.5"}`}>
                                <FaTrashAlt
                                    className={`inline ${layout === "list" ? "" : "sm:text-xl"}`}
                                />{" "}
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`${layout === "list" ? "flex items-center justify-between w-full" : "flex flex-col justify-between"}`}>
                    <div
                        className={` ${columns === 4 ? "p-1 lg:p-3" : columns === 1 && layout === "grid" ? "p-3" : layout === "list" ? "sm:px-3 xs:px-1.5 px-1" : "sm:p-3 xs:p-1.5 p-1"}`}>
                        <div
                            className={`flex items-center  ${layout === "list" && columns === 2 ? "gap-0.5 sm:gap-2" : "gap-2"}`}>
                            {/* Favicon section */}
                            {data.favicon ? (
                                <Image
                                    src={data.favicon}
                                    alt='Favicon'
                                    width={16}
                                    height={16}
                                    className='w-5 h-5 object-contain '
                                />
                            ) : (
                                <div className='rounded-full xs:text-xl text-sm bg-primary p-1 text-white '>
                                    <CiGlobe />
                                </div>
                            )}
                            <h2
                                className={` font-semibold line-clamp-1 ${(layout === "list" && columns === 2) || columns === 4 ? "xs:text-md text-sm" : "xs:text-lg sm:text-xl"}`}
                                title=' Unsplash - Free Photos'>
                                {data.title}
                            </h2>
                        </div>
                        <p
                            className={`xs:text-sm capitalize text-xs text-text/80 line-clamp-1 ${layout === "list" || columns === 2 ? "line-clamp-2" : "line-clamp-1"}`}
                            title={data?.notes || ""}>
                            <span className='font-semibold'>Notes:</span>{" "}
                            {data?.notes}
                        </p>
                        <div
                            className={`items-center flex-wrap gap-1 md:gap-2 mt-1 ${columns === 4 ? "flex" : layout === "list" && columns === 2 ? "hidden md:flex" : "flex"}`}>
                            {data?.tags && data?.tags?.length > 0 ? (
                                data.tags?.map((tagItem) => (
                                    <span
                                        key={tagItem.name}
                                        style={{
                                            backgroundColor:
                                                tagItem.color + "20",
                                            color: tagItem.color,
                                        }}
                                        className={`sm:p-1 p-0.5 text-xs font-bold px-2.5 sm:px-3 text-center rounded-full flex items-center gap-1 justify-center ${columns === 4 ? "w-full lg:w-fit" : columns === 1 ? "w-fit" : layout === "list" ? "w-fit" : "w-full sm:w-fit"}`}>
                                        {tagItem.name}
                                    </span>
                                ))
                            ) : (
                                <span
                                    className={`sm:p-1 line-clamp-1 p-0.5 text-xs font-bold bg-blue-300 text-blue-700 px-2.5 sm:px-3 text-center rounded-full flex items-center gap-1 justify-center ${columns === 4 ? "w-full lg:w-fit" : columns === 1 ? "w-fit" : layout === "list" ? "w-fit" : "w-full sm:w-fit"}`}>
                                    No tags selected
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={`border-text/10 items-center justify-between p-1.5 px-3 ${columns === 4 ? "p-1.5 border-t hidden sm:flex" : layout === "list" && columns === 2 ? "hidden " : layout === "grid" ? "border-t flex sm:p-3" : "hidden sm:flex sm:p-3"} `}>
                        <h5
                            className={` whitespace-nowrap items-center gap-1 sm:gap-1.5 text-sm text-text/70 ${columns === 4 || columns === 3 ? "hidden lg:flex" : columns === 1 ? "flex" : layout === "list" ? "hidden" : "hidden md:flex"}`}>
                            <RiMenuAddLine className='' />
                            <span
                                className={`${(layout === "list" || columns === 4) && "hidden"}`}>
                                Created
                            </span>{" "}
                            Feb 5, 2024
                        </h5>
                        <h5 className='flex items-center gap-1.5 text-sm text-text/70 whitespace-nowrap'>
                            <MdUpdate className='' />
                            <span
                                className={` ${layout === "list" || columns === 4 ? "hidden" : "hidden sm:inline-block"}`}>
                                Updated
                            </span>{" "}
                            Feb 5,2024
                        </h5>
                    </div>
                </div>
                <ShareModal
                    isOpen={isOpenShareModal}
                    setIsOpen={setIsOpenShareModal}
                    url={`${data.url}`}
                    text='Check out this bookmark!'
                />
            </div>
        </>
    );
};

export default BookmarkCard;
