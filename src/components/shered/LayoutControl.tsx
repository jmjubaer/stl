import React from "react";
import { FaList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { LuColumns2, LuColumns3, LuColumns4 } from "react-icons/lu";
import { PiTextColumnsBold } from "react-icons/pi";
import { TbColumns1 } from "react-icons/tb";
import { TfiLayoutColumn4Alt } from "react-icons/tfi";
type TProps = {
    layout: "grid" | "list";
    columns: number;
    setLayout: React.Dispatch<React.SetStateAction<"grid" | "list">>;
    setColumns: React.Dispatch<React.SetStateAction<number>>;
};
const LayoutControl = ({ columns, layout, setColumns, setLayout }: TProps) => {
    return (
        <div className='flex gap-3'>
            {/* Grid change section */}
            <div className=''>
                <button
                    onClick={() => {
                        setLayout("list");
                        setColumns(1);
                    }}
                    className={`px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                        layout === "list" &&
                        "bg-text text-background border-text"
                    }`}>
                    <FaList />
                </button>
                <button
                    onClick={() => {
                        setLayout("grid");
                        setColumns(3);
                    }}
                    className={`px-5 border py-2 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                        layout === "grid" &&
                        "bg-text text-background border-text"
                    }`}>
                    <IoGrid className='tex' />
                </button>
            </div>

            {/* Grid column quantity change section */}
            {layout === "grid" ? (
                <div className=''>
                    <button
                        onClick={() => setColumns(1)}
                        className={`inline xs:hidden border-r-0 px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                            columns === 1 &&
                            "bg-text text-background border-text"
                        }`}>
                        <TbColumns1 />
                    </button>
                    <button
                        onClick={() => setColumns(2)}
                        className={`px-5 border py-2 xs:rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                            columns === 2 &&
                            "bg-text text-background border-text"
                        }`}>
                        <LuColumns2 />
                    </button>
                    <button
                        onClick={() => setColumns(3)}
                        className={`px-5 border py-2 hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary rounded-r-2xl md:rounded-r-none ${
                            columns === 3 &&
                            "bg-text text-background border-text"
                        }`}>
                        <LuColumns3 className='tex' />
                    </button>
                    <button
                        onClick={() => setColumns(4)}
                        className={`hidden  md:inline-block px-5 border py-2 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                            columns === 4 &&
                            "bg-text text-background border-text"
                        }`}>
                        <LuColumns4 className='tex' />
                    </button>
                </div>
            ) : (
                <div className='flex'>
                    <button
                        onClick={() => setColumns(1)}
                        className={`px-5 border py-2 rounded-s-2xl hover:bg-primary hover:text-white cursor-pointer hover:border-primary ${
                            columns === 1 &&
                            "bg-text text-background border-text"
                        }`}>
                        <TfiLayoutColumn4Alt className='rotate-90' />
                    </button>
                    <button
                        onClick={() => setColumns(2)}
                        className={`px-4 border py-1 rounded-r-2xl hover:bg-primary hover:text-white border-s-0 cursor-pointer hover:border-primary ${
                            columns === 2 &&
                            "bg-text text-background border-text"
                        }`}>
                        <PiTextColumnsBold className='text-2xl' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default LayoutControl;
