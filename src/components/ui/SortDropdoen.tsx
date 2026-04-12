import { TSortBy } from "@/src/types";
import { useEffect, useRef, useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
type TagDropdownProps = {
    sortby: TSortBy;
    setSortby: React.Dispatch<React.SetStateAction<TSortBy>>;
};
const SortDropdown = ({ sortby, setSortby }: TagDropdownProps) => {
    const [openSort, setOpenSort] = useState(false);

    
    const handleSetSortBy = (sortby: TSortBy) => {
        setSortby(sortby);
        
        setOpenSort(false);
    };
    
    // Close dropdown when clicking outside
    const sortbyRef = useRef<HTMLDivElement>(null);
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
                className={`sm:px-5 px-4 py-1.5 border whitespace-nowrap border-text/20 sm:rounded-xl rounded-md outline-none cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500  ${openSort && "bg-primary text-white border-primary"}`}>
                <LuArrowDownUp className='inline sm:mr-2 text-xl' />{" "}
                <span className='hidden sm:inline'>{sortby.name}</span>
            </button>
            {/* Dropdown */}
            <div
                className={`absolute top-10 border border-text/20 rounded-xl right-0 sm:left-0 bg-background shadow-md dark:shadow-white/20 sm:w-60 w-52 z-10 ${
                    openSort ? "block" : "hidden"
                }`}>
                <h3 className='sm:p-2 p-1 px-3 border-b border-text/20'>
                    Sort by
                </h3>
                <div className='p-1 px-1.5'>
                    <button
                        onClick={() =>
                            handleSetSortBy({
                                name: "Newest First",
                                value: "-createdAt",
                            })
                        }
                        className={`px-3 sm:py-2 py-1.5 rounded-xl text-sm sm:text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full ${
                            sortby.name === "Newest First" &&
                            "bg-primary text-white"
                        }`}>
                        Newest First
                    </button>{" "}
                    <button
                        onClick={() =>
                            handleSetSortBy({
                                name: "Oldest First",
                                value: "createdAt",
                            })
                        }
                        className={`px-3 sm:py-2 py-1.5 rounded-xl text-sm sm:text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby.name === "Oldest First" &&
                            "bg-primary text-white"
                        }`}>
                        Oldest First
                    </button>
                    <button
                        onClick={() =>
                            handleSetSortBy({
                                name: "Recently Updated",
                                value: "-updatedAt",
                            })
                        }
                        className={`px-3 sm:py-2 py-1.5 rounded-xl text-sm sm:text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby.name === "Recently Updated" &&
                            "bg-primary text-white"
                        }`}>
                        Recently Updated
                    </button>
                    <button
                        onClick={() =>
                            handleSetSortBy({
                                name: "Title A to Z",
                                value: "title",
                            })
                        }
                        className={`px-3 sm:py-2 py-1.5 rounded-xl text-sm sm:text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby.name === "Title A to Z" &&
                            "bg-primary text-white"
                        }`}>
                        Title A to Z
                    </button>
                    <button
                        onClick={() =>
                            handleSetSortBy({
                                name: "Title Z to A",
                                value: "-title",
                            })
                        }
                        className={`px-3 sm:py-2 py-1.5 rounded-xl text-sm sm:text-[15px] hover:bg-primary hover:text-white cursor-pointer flex items-center w-full mt-0.5 ${
                            sortby.name === "Title Z to A" &&
                            "bg-primary text-white"
                        }`}>
                        Title Z to A
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SortDropdown;
