import logo from "@/src/assets/logo/logo.png";
import {
    openBookmarkModal,
    openFolderModal,
} from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/src/redux/hook";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { RiFolderAddLine } from "react-icons/ri";
const EmptyBookmark = () => {
    const dispatch = useAppDispatch();
   
    return (
        <div className='container flex items-center justify-center flex-col gap-3 py-10'>
            <Image src={logo} alt='Logo' className='w-24' />
            <h2 className='text-2xl font-semibold text-text/50'>
                No bookmark available
            </h2>
            <p> Add a bookmark or create a folder to get started</p>
            <div className='flex items-center gap-3'>
                <button
                    onClick={() => dispatch(openFolderModal())}
                    className='text-left py-2 px-3 bg-primary/95 shadow-2xl w-40 hover:bg-primary text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/20 z-50'>
                    <RiFolderAddLine className='text-lg' /> Create Folder
                </button>{" "}
                <button
                    onClick={() => dispatch(openBookmarkModal())}
                    className=' py-2 px-3 bg-background shadow-2xl w-40 hover:bg-primary hover:text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/50 z-50 duration-300'>
                    <FaPlus className='text-xl' /> Add Bookmark
                </button>{" "}
            </div>
        </div>
    );
};

export default EmptyBookmark;
