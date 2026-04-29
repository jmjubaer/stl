"use client";
import React from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import ShowAlert from "@/src/utils/ShowAlert";
import Swal from "sweetalert2";
import { renameFolder } from "@/src/services/FolderServices";
import { selectToken, setIsExpired } from "@/src/redux/features/auth/authSlice";
import { TFolder } from "@/src/types";
import { closeBookmarkModal } from "@/src/redux/features/modal/modalSlice";

type TInputs = {
    newName: string;
};
type TProps = {
    folder: TFolder;
    isOpen: boolean;
    setRefetchFolder: React.Dispatch<React.SetStateAction<number>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const RenameFolderForm = ({
    folder,
    isOpen,
    setIsOpen,
    setRefetchFolder,
}: TProps) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleRenameFolder: SubmitHandler<TInputs> = async (data) => {
        try {
            Swal.fire({
                title: "Renaming Folder...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
                customClass: { container: "swal-z-index" },
            });
            const res = await renameFolder(token as string, folder._id, data);
            if (res.success) {
                ShowAlert("Success", "success", "Folder rename successfully");
                setRefetchFolder((prev) => prev + 1);
                dispatch(closeBookmarkModal());
                handleCancel();
            } else {
                if (res.message === "Token has expired") {
                    dispatch(setIsExpired());
                } else {
                    ShowAlert("Error", "error", res.message);
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
    };

    const handleCancel = () => {
        setIsOpen(false);
        reset();
    };

    return (
        <>
            <Modal
                open={isOpen}
                onCancel={handleCancel}
                footer={false}
                className='modal z-50'>
                <div className='text-base'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>
                        {" "}
                        New Folder
                    </h2>
                    <form onSubmit={handleSubmit(handleRenameFolder)}>
                        <label className='block mb-2 text-s font-medium text-text/80'>
                            Folder Name :
                        </label>
                        <input
                            defaultValue={folder.name}
                            {...register("newName", { required: true })}
                            type='text'
                            className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.newName ? "border-red-500" : "border-text/50"}`}
                            placeholder='Enter folder name ....'
                        />
                        {errors.newName && (
                            <span className='text-red-500'>
                                {" "}
                                Folder name is required
                            </span>
                        )}
                        <div className='flex justify-end gap-5 mt-5'>
                            <button
                                onClick={handleCancel}
                                className='border hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'>
                                Cancel
                            </button>
                            <button
                                className='border bg-blue-700 text-white hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'
                                type='submit'>
                                Create Folder
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default RenameFolderForm;
