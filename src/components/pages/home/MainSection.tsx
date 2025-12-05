"use client";
import { Select } from "antd";
import { useState } from "react";
import { FaList } from "react-icons/fa6";
import { IoGrid, IoGridOutline } from "react-icons/io5";

const MainSection = () => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <section className=''>
            <div className=' py-3 shadow-sm dark:shadow-md dark:shadow-secondary/20'>
                <div className='flex items-center justify-between container'>
                    <div className=''>
                        <Select
                            className="!bg-primary/10 !text-primary !border-0 !shadow-lg !active:text-primary dark:shadow-secondary/10"
                            defaultValue='lucy'
                            style={{ width: 200 }}
                            onChange={handleChange}
                            options={[
                                {
                                    label: <span>Sort by</span>,
                                    title: "Sort by",
                                    options: [
                                        {
                                            label: <span>Name</span>,
                                            value: "Name",
                                        },
                                        {
                                            label: <span>Created Date</span>,
                                            value: "Created Date",
                                        },
                                        {
                                            label: <span>Modified Date</span>,
                                            value: "Modified Date",
                                        },
                                    ],
                                },
                                {
                                    label: <span>Sort direction</span>,
                                    title: "Sort direction",
                                    options: [
                                        {
                                            label: <span>A to Z</span>,
                                            value: "A to Z",
                                        },
                                        {
                                            label: <span>Z to A</span>,
                                            value: "Z to A",
                                        },
                                    ],
                                },
                            ]}
                        />
                    </div>
                    {/* Grid change section */}
                    <div className=''>
                        <button
                            onClick={() => setLayout("list")}
                            className={`px-5 border py-2 rounded-s-2xl  cursor-pointer ${
                                layout === "list" &&
                                "bg-primary text-background border-primary"
                            }`}>
                            <FaList />
                        </button>
                        <button
                            onClick={() => setLayout("grid")}
                            className={`px-5 border py-2 rounded-r-2xl border-s-0 cursor-pointer ${
                                layout === "grid" &&
                                "bg-primary text-background border-primary"
                            }`}>
                            <IoGrid className='tex' />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
