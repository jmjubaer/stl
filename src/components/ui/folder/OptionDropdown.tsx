"use client";
import { selectToken, setIsExpired } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { deleteFolder } from "@/src/services/FolderServices";
import { TFolder } from "@/src/types";
import ShowAlert from "@/src/utils/ShowAlert";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import Swal from "sweetalert2";
import RenameFolderForm from "./RenameFolder";
import ShareModal from "../ShareModal";
import config from "@/src/config";

type TProps = {
    data: TFolder;
    columns: number;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
    setRefetchFolder: React.Dispatch<React.SetStateAction<number>>;
};
const OptionDropdown = ({
    columns,
    setRefetchBookmark,
    setRefetchFolder,
    data,
}: TProps) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenRenameModal, setIsOpenRenameModal] = useState(false);
    const [isOpenShareModal, setIsOpenShareModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
                    const res = await deleteFolder(token as string, data._id);
                    if (res.success) {
                        ShowAlert(
                            "Folder deleted!",
                            "success",
                            "Folder deleted successfully",
                        );
                        setIsOpen(!isOpen);
                        setRefetchBookmark((prev) => prev + 1);
                        setRefetchFolder((prev) => prev + 1);
                    } else {
                        if (res.message === "Token has expired") {
                            dispatch(setIsExpired());
                        } else {
                            ShowAlert(
                                "Error",
                                "error",
                                res.message || "Failed to delete folder",
                            );
                        }
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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div
            className={` ${columns === 3 ? "sm:static absolute top-2 right-2" : ""}`}
            ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`cursor-pointer  z-10`}>
                <BsThreeDotsVertical />
            </button>
            {isOpen && (
                <div
                    className={`bg-background absolute rounded-lg shadow-lg p-1 w-40 z-10 border border-text/20 ${columns === 3 ? "top-6 sm:top-10 right-0 sm:right-2" : "top-10 right-2"}`}>
                    <button
                        onClick={() => setIsOpenShareModal(!isOpenShareModal)}
                        className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center  gap-1'>
                        <IoIosShareAlt className='text-xl' /> Share
                    </button>{" "}
                    <button
                        onClick={() => setIsOpenRenameModal(true)}
                        className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center  gap-1'>
                        <MdOutlineEdit className='text-xl' /> Rename
                    </button>{" "}
                    <button
                        onClick={handleDeleteFolder}
                        className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center gap-2.5'>
                        <FaTrashAlt className='text-md ' /> Delete
                    </button>
                </div>
            )}

            <RenameFolderForm
                folder={data}
                isOpen={isOpenRenameModal}
                setIsOpen={setIsOpenRenameModal}
                setRefetchBookmark={setRefetchBookmark}
                setRefetchFolder={setRefetchFolder}
            />
            <ShareModal
                isOpen={isOpenShareModal}
                setIsOpen={setIsOpenShareModal}
                url={`${config.CLIENT_API}/${data._id}`}
                text="Check out this folder!"

            />
        </div>
    );
};

export default OptionDropdown;
