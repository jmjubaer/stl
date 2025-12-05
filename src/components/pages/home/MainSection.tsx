"use client";
import { Select } from "antd";
import { useState } from "react";
import { FaList } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";

const MainSection = () => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    return (
        <section className='container'>
            <div className='flex items-center justify-between py-3'>
                <p>Save the Link</p>
                <div className=''>
                    <button
                        onClick={() => setLayout("list")}
                        className={`px-5 border py-2 rounded-s-2xl  cursor-pointer ${layout === "list" && "bg-primary"}`}>
                        <FaList />
                    </button>
                    <button
                        onClick={() => setLayout("grid")}
                        className='px-5 border py-2 rounded-r-2xl border-s-0 cursor-pointer'>
                        <IoGridOutline />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
