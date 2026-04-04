import logo from "@/src/assets/logo/logo.png";
import { openBookmarkModal } from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/src/redux/hook";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
const EmptyFolder = () => {
    const dispatch = useAppDispatch();
    return (
        <div className='container flex items-center justify-center flex-col gap-3 py-10'>
            <Image src={logo} alt='Logo' className='w-24' />
            <h2 className='text-3xl font-semibold text-text/50'>
                This folder is empty
            </h2>
            <p> Delete the folder or add a bookmark to get started</p>
            <div className='flex items-center gap-3'>
                <button
                    // onClick={handleOpenLinkModal}
                    className='text-left py-2 px-3 bg-primary/95 shadow-2xl w-40 hover:bg-primary text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/20 z-50'>
                    <FaTrashAlt className='text-' /> Delete Folder
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

export default EmptyFolder;
