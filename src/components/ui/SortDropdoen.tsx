import { useEffect, useRef, useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
type TagDropdownProps = {
    sortby: string;
    setSortby: React.Dispatch<React.SetStateAction<string>>;
};
const SortDropdown = ({ sortby, setSortby }: TagDropdownProps) => {
    const [openSort, setOpenSort] = useState(false);

    const sortbyRef = useRef<HTMLDivElement>(null);

    const handleSetSortBy = (sortby: string) => {
        setSortby(sortby);
        setOpenSort(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                sortbyRef.current &&
                !sortbyRef.current.contains(e.target as Node)
            ) {
                setOpenSort(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='relative' ref={sortbyRef}>
            <button
                onClick={() => setOpenSort(!openSort)}
                className='px-5 py-1.5 border border-text/20 rounded-xl outline-none cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500'>
                <LuArrowDownUp className='inline mr-2 text-xl' />{" "}
                <span className='inline'>{sortby}</span>
            </button>
            <div
                className={`absolute top-10 border border-text/20 rounded-xl left-0 bg-background shadow-md dark:shadow-white/20 w-60 ${
                    openSort ? "block" : "hidden"
                }`}>
                <h3 className='p-2 px-3 border-b border-text/20'>Sort by</h3>
                <div className='p-1 px-1.5'>
                    <button
                        onClick={() => handleSetSortBy("Newest First")}
                        className={`px-3 py-2 rounded-xl text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full ${
                            sortby === "Newest First" && "bg-primary text-white"
                        }`}>
                        Newest First
                    </button>{" "}
                    <button
                        onClick={() => handleSetSortBy("Oldest First")}
                        className={`px-3 py-2 rounded-xl text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby === "Oldest First" && "bg-primary text-white"
                        }`}>
                        Oldest First
                    </button>
                    <button
                        onClick={() => handleSetSortBy("Recently Updated")}
                        className={`px-3 py-2 rounded-xl text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby === "Recently Updated" &&
                            "bg-primary text-white"
                        }`}>
                        Recently Updated
                    </button>
                    <button
                        onClick={() => handleSetSortBy("Title A to Z")}
                        className={`px-3 py-2 rounded-xl text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby === "Title A to Z" && "bg-primary text-white"
                        }`}>
                        Title A to Z
                    </button>
                    <button
                        onClick={() => handleSetSortBy("Title Z to A")}
                        className={`px-3 py-2 rounded-xl text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby === "Title Z to A" && "bg-primary text-white"
                        }`}>
                        Title Z to A
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SortDropdown;
