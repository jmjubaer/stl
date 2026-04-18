import { TTag } from "@/src/types";
import { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { Spin } from "antd";
import { useAppDispatch } from "@/src/redux/hook";
import { openTagModal } from "@/src/redux/features/modal/modalSlice";
type TagDropdownProps = {
    tag: TTag[];
    setTag: React.Dispatch<React.SetStateAction<TTag[]>>;
    setRefetchTags: React.Dispatch<React.SetStateAction<number>>;
    isPending: boolean;
    tagList: TTag[];
};
const TagDropdown = ({
    tag,
    setTag,
    setRefetchTags,
    isPending,
    tagList,
}: TagDropdownProps) => {
    const [isOpenTagModal, setIsOpenTagModal] = useState(false);
    const dispatch = useAppDispatch();
    const [openTag, setOpenTag] = useState(false);
    const tagRef = useRef<HTMLDivElement>(null);
    const handleToggleTag = (tag: TTag) => {
        setTag((prevTag) =>
            prevTag.some((t) => t.name === tag.name)
                ? prevTag.filter((t) => t.name !== tag.name)
                : [...prevTag, tag],
        );
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (tagRef.current && !tagRef.current.contains(e.target as Node)) {
                setOpenTag(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className='relative' ref={tagRef}>
            {/* Tag button */}
            <button
                onClick={() => setOpenTag(!openTag)}
                className={`sm:px-5 px-4 py-1.5 border border-text/20 sm:rounded-xl rounded-md outline-none cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-1 ${(openTag || tag.length > 0) && "bg-primary text-white border-primary"}`}>
                <CiFilter className='inline text-xl' />{" "}
                <span className='hidden sm:inline'>Tags</span>
                <span
                    className={`sm:w-6 w-5 sm:h-6 h-5 bg-text/30 rounded-full text-xs flex items-center justify-center ${
                        tag.length > 0 ? "block" : "hidden"
                    }`}>
                    {tag.length}
                </span>
            </button>
            {/* Dropdown */}
            {
                <ul
                    className={`absolute top-10 border border-text/20 rounded-xl sm:left-0 right-0 bg-background shadow-md dark:shadow-white/20 w-48 z-20 ${
                        openTag ? "visible" : "hidden"
                    }`}>
                    {/* all tag */}
                    <Spin size='small' spinning={isPending}>
                        <div className='p-1 px-1.5 max-h-40 overflow-y-auto'>
                            {tagList.map((tagItem) => (
                                <li
                                    key={tagItem.name}
                                    onClick={() => handleToggleTag(tagItem)}
                                    className='px-3 py-1.5 rounded-xl text-xs hover:bg-text/5 cursor-pointer flex items-center gap-3'>
                                    <FaCheck
                                        className={`text-sm ${
                                            tag.some(
                                                (t) => t.name === tagItem.name,
                                            )
                                                ? "block"
                                                : "invisible"
                                        }`}
                                    />

                                    <span
                                        style={{
                                            backgroundColor:
                                                tagItem.color + "20",
                                            color: tagItem.color,
                                        }}
                                        className='p-1  font-bold px-3 capitalize rounded-full'>
                                        {tagItem.name}
                                    </span>
                                </li>
                            ))}
                        </div>
                    </Spin>
                    {/* Add tag */}
                    <div className='p-1 px-1.5 border-t border-text/20'>
                        <button
                            onClick={() => dispatch(openTagModal())}
                            className='px-3 py-1 rounded-xl text-sm hover:bg-primary hover:text-white cursor-pointer flex items-center gap-3 w-full'>
                            <GoPlus className='text-2xl' />
                            Add Tag
                        </button>
                    </div>
                </ul>
            }

        </div>
    );
};

export default TagDropdown;
