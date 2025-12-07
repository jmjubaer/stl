import { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
type TagDropdownProps = {
    tag: string[];
    setTag: React.Dispatch<React.SetStateAction<string[]>>;
};
const TagDropdown = ({ tag, setTag }: TagDropdownProps) => {
    const [openTag, setOpenTag] = useState(false);
    const handleToggleTag = (tag: string) => {
        setTag((prevTag) =>
            prevTag.includes(tag)
                ? prevTag.filter((t) => t !== tag)
                : [...prevTag, tag]
        );
    };
    const tagRef = useRef<HTMLDivElement>(null);

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
    const tagList = [
        { name: "Design", color: "#9952E0" },
        { name: "Development", color: "#1A8CFF" },
        { name: "Tutorial", color: "#28BD66" },
        { name: "Marketing", color: "#F97A1F" },
        { name: "Inspiration", color: "#1DBAC9" },
    ];
    return (
        <div className='relative' ref={tagRef}>
            <button
                onClick={() => setOpenTag(!openTag)}
                className='px-5 py-1.5 border border-text/20 rounded-xl outline-none cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500'>
                <CiFilter className='inline mr-1 text-xl' />{" "}
                <span className='inline'>Tags</span>
            </button>
            <ul
                className={`absolute top-10 border border-text/20 p-1 px-1.5 rounded-xl left-0 bg-background shadow-md dark:shadow-white/20 w-48 ${
                    openTag ? "visible" : "hidden"
                }`}>
                {tagList.map((tagItem) => (
                    <li
                        key={tagItem.name}
                        onClick={() => handleToggleTag(tagItem.name)}
                        className='px-3 py-2 rounded-xl text-xs hover:bg-text/5 cursor-pointer flex items-center gap-3'>
                        <FaCheck
                            className={`text-sm ${
                                tag.includes(tagItem.name)
                                    ? "visible"
                                    : "invisible"
                            }`}
                        />

                        <span
                            style={{
                                backgroundColor: tagItem.color + "20",
                                color: tagItem.color,
                            }}
                            className='p-1  font-bold px-3  rounded-full'>
                            {tagItem.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagDropdown;
