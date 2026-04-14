"use client";
import{ useState } from "react";
import TopNav from "../../shered/TopNav";
import LayoutControl from "../../shered/LayoutControl";
import { TBookmark } from "@/src/types";
import ShareCard from "../../ui/Bookmark/ShareCard";

const Folder = ({ data }: { data: TBookmark[] }) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [columns, setColumns] = useState<number>(3);
    return (
        <div className='container'>
            <div className='flex items-center gap-3 justify-between py-3 shadow-sm dark:shadow-md dark:shadow-text/10 bg-background   '>
                <TopNav folderName='test' />

                <div className='w-auto'>
                    <LayoutControl
                        columns={columns}
                        layout={layout}
                        setColumns={setColumns}
                        setLayout={setLayout}
                    />
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

                    {data.map((bookmark) => (
                        <ShareCard
                            key={bookmark._id}
                            columns={columns}
                            layout={layout}
                            data={bookmark}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Folder;
