"use client";
import logo from "@/src/assets/logo/logo.png";
import { selectToken, setIsExpired } from "@/src/redux/features/auth/authSlice";
import { openBookmarkModal } from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { deleteFolder } from "@/src/services/FolderServices";
import ShowAlert from "@/src/utils/ShowAlert";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
type TProps = {
    selectedFolder: string;
    setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
};
const EmptyFolder = ({
    selectedFolder,
    setSelectedFolder,
    setRefetchBookmark,
}: TProps) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const handleDeleteFolder = async () => {
        Swal.fire({
            title: "Warning",
            text: "Are you want to delete this Folder?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteFolder(
                        token as string,
                        selectedFolder,
                    );
                    if (res.success) {
                        ShowAlert(
                            "Folder deleted!",
                            "success",
                            "Folder deleted successfully",
                        );
                        setRefetchBookmark((prev) => prev + 1);
                        setSelectedFolder("");
                    } else {
                        if (res.message === "Token has expired") {
                            dispatch(setIsExpired());
                        }else{
                        ShowAlert(
                            "Error",
                            "error",
                            res.message || "Failed to delete folder",
                        );}
                    }
                } catch (error) {
                    ShowAlert(
                        "Error",
                        "error",
                        error instanceof Error
                            ? error.message
                            : "An unknown error occurred",
                    );
                }
            }
        });
    };
    return (
        <div className='container flex items-center justify-center flex-col gap-3 py-10'>
            <Image src={logo} alt='Logo' className='w-24' />
            <h2 className='text-3xl font-semibold text-text/50'>
                This folder is empty
            </h2>
            <p> Delete the folder or add a bookmark to get started</p>
            <div className='flex items-center gap-3'>
                <button
                    onClick={handleDeleteFolder}
                    className='text-left py-2 px-3 bg-primary/95 shadow-2xl w-40 hover:bg-primary text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/20 z-50'>
                    <FaTrashAlt className='text-' /> Delete Folder
                </button>{" "}
                <button
                    onClick={() => dispatch(openBookmarkModal(selectedFolder))}
                    className=' py-2 px-3 bg-background shadow-2xl w-40 hover:bg-primary hover:text-white/90 rounded-xl cursor-pointer flex items-center gap-2 border border-text/50 z-50 duration-300'>
                    <FaPlus className='text-xl' /> Add Bookmark
                </button>{" "}
            </div>
        </div>
    );
};

export default EmptyFolder;
