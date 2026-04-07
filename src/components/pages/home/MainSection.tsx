"use client";
import { useEffect, useMemo, useState, useTransition } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import TagDropdown from "../../ui/TagDropdown";
import SortDropdown from "../../ui/SortDropdoen";
import { TData, TSortBy, TTag } from "@/src/types";
import BookmarkCard from "../../ui/Bookmark/BookmarkCard";
import FolderCard from "../../ui/folder/FolderCard";
import AddButton from "../../ui/AddButton";
import SelectBookmarkControl from "../../ui/Bookmark/SelectBookmarkControl";
import TopNav from "../../shered/TopNav";
import LayoutControl from "../../shered/LayoutControl";
import { getBookmarks } from "@/src/services/BookmarkServices";
import { useAppSelector } from "@/src/redux/hook";
import { selectToken } from "@/src/redux/features/auth/authSlice";
import EmptyFolder from "../../ui/folder/EmptyFolder";
import EmptyBookmark from "../../ui/Bookmark/EmptyBookmark";
import NonUserCard from "../../ui/NonUserCard";
import { Spin } from "antd";
const MainSection = () => {
    const token = useAppSelector(selectToken);
    const [isPending, startTransition] = useTransition();
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [columns, setColumns] = useState<number>(3);
    const [selectBookmark, setSelectBookmark] = useState<string[]>([]);
    const [tag, setTag] = useState<TTag[]>([]);
    const [sortby, setSortby] = useState<TSortBy>({
        name: "Newest First",
        value: "",
    });
    const [searchText, setSearchText] = useState<string>("");
    const [selectedFolder, setSelectedFolder] = useState<string>("");
    const [selectedFolderName, setSelectedFolderName] = useState<string>("");
    const [refetchBookmark, setRefetchBookmark] = useState(0);
    const [refetchFolder, setRefetchFolder] = useState(0);
    const [allData, setAllData] = useState<TData>({
        bookmarks: [],
        folders: [],
        pinnedBookmarks: [],
    });
    useEffect(() => {
        startTransition(async () => {
            if (token) {
                const res = await getBookmarks(token as string, [
                    { name: "searchTerm", value: searchText },
                    { name: "sort", value: sortby.value },
                    ...(tag.length > 0
                        ? [
                              {
                                  name: "tags",
                                  value: tag.map((t) => t._id).join(","),
                              },
                          ]
                        : []),
                ]);
                console.log(res);
                if (res?.success) {
                    setAllData(res.data);
                }
            } else {
                setAllData({
                    bookmarks: [],
                    folders: [],
                    pinnedBookmarks: [],
                });
            }
        });
    }, [token, searchText, sortby, tag, refetchBookmark]);

    const displayData = useMemo(() => {
        if (!selectedFolder) return allData;
        const folder = allData?.folders?.find((f) => f._id === selectedFolder);
        return {
            bookmarks: folder?.bookmarks || [],
            folders: [],
            pinnedBookmarks: [],
        };
    }, [allData, selectedFolder]);

    return (
        <section className=''>
            {/* Top Navigation */}
            <div className='mt-2 container'>
                <TopNav
                    selectedFolder={selectedFolder}
                    folderName={selectedFolderName}
                    setSelectedFolder={setSelectedFolder}
                />
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
                                onChange={(e) => setSearchText(e.target.value)}
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

            <Spin
                size='large'
                tip='Loading...'
                spinning={isPending}
                className='my-10'>
                {/* Folder Section  */}
                {displayData?.folders?.length > 0 && (
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
                            {displayData?.folders?.map((folder) => (
                                <FolderCard
                                    key={folder._id}
                                    columns={columns}
                                    layout={layout}
                                    data={folder}
                                    setSelectedFolder={setSelectedFolder}
                                    setSelectedFolderName={
                                        setSelectedFolderName
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}
                {/* Pin bookmark section` */}
                {displayData?.pinnedBookmarks?.length > 0 && (
                    <div className='container my-2'>
                        <h2 className='text-text/50 uppercase text-lg font-bold mb-2'>
                            Pinned Bookmarks
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

                            {displayData?.pinnedBookmarks?.map((bookmark) => (
                                <BookmarkCard
                                    key={bookmark._id}
                                    columns={columns}
                                    layout={layout}
                                    selectBookmark={selectBookmark}
                                    setSelectBookmark={setSelectBookmark}
                                    data={bookmark}
                                    isPinned
                                />
                            ))}
                        </div>
                    </div>
                )}{" "}
                {/* bookmark section` */}
                {(displayData?.bookmarks?.length > 0 ||
                    displayData?.pinnedBookmarks?.length > 0 ||
                    displayData?.folders?.length > 0) && (
                    <div className='container my-2'>
                        <h2 className='text-text/50 uppercase text-lg font-bold mb-2'>
                            Bookmarks
                        </h2>
                        {displayData?.bookmarks?.length > 0 ? (
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

                                {displayData?.bookmarks?.map((bookmark) => (
                                    <BookmarkCard
                                        key={bookmark._id}
                                        columns={columns}
                                        layout={layout}
                                        selectBookmark={selectBookmark}
                                        setSelectBookmark={setSelectBookmark}
                                        data={bookmark}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyBookmark />
                        )}
                    </div>
                )}
                {/* Empty data section */}
                {displayData?.bookmarks?.length === 0 &&
                displayData?.folders?.length === 0 &&
                displayData?.pinnedBookmarks?.length === 0 &&
                !selectedFolder &&
                token ? (
                    <EmptyBookmark />
                ) : displayData?.bookmarks?.length === 0 &&
                  displayData?.folders?.length === 0 &&
                  displayData?.pinnedBookmarks?.length === 0 &&
                  selectedFolder &&
                  token ? (
                    <EmptyFolder />
                ) : (
                    ""
                )}
                {/* If the use not login */}
                {!token && <NonUserCard />}
                {/* Card Select Option */}
                <SelectBookmarkControl
                    refetchFolder={refetchFolder}
                    selectBookmark={selectBookmark}
                    setSelectBookmark={setSelectBookmark}
                    setRefetchBookmark={setRefetchBookmark}
                />
            </Spin>
            {/* Add button section */}
            <div className=''>
                <AddButton setRefetchFolder={setRefetchFolder} />
            </div>
        </section>
    );
};

export default MainSection;
