"use client";
import React from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import {
    closeFolderModal,
    selectOpenFolderModal,
} from "@/src/redux/features/modal/modalSlice";
import ShowAlert from "@/src/utils/ShowAlert";
import Swal from "sweetalert2";
import { createFolder } from "@/src/services/FolderServices";
import { selectToken } from "@/src/redux/features/auth/authSlice";

type TInputs = {
    folderName: string;
};
type TProps = {
    setRefetchFolder: React.Dispatch<React.SetStateAction<number>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
};
const AddFolderForm = ({ setRefetchFolder, setRefetchBookmark }: TProps) => {
    const token = useAppSelector(selectToken);
    const dispatch = useAppDispatch();
    const isOpenFolderModal = useAppSelector(selectOpenFolderModal);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleCreateFolder: SubmitHandler<TInputs> = async (data) => {
        console.log(data);
        try {
            Swal.showLoading();
            const res = await createFolder(token as string, {
                name: data.folderName,
            });
            if (res.success) {
                ShowAlert("Success", "success", "Folder created successfully");
                reset();
                setRefetchFolder((prev) => prev + 1);
                setRefetchBookmark((prev) => prev + 1);
                dispatch(closeFolderModal());
            } else {
                ShowAlert("Error", "error", res.message);
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
        dispatch(closeFolderModal());
        reset();
    };

    return (
        <>
            <Modal
                open={isOpenFolderModal}
                onCancel={handleCancel}
                footer={false}
                className='modal z-50'>
                <div className='text-base'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>
                        {" "}
                        New Folder
                    </h2>
                    <form onSubmit={handleSubmit(handleCreateFolder)}>
                        <label className='block mb-2 text-s font-medium text-text/80'>
                            Folder Name :
                        </label>
                        <input
                            {...register("folderName", { required: true })}
                            type='text'
                            className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.folderName ? "border-red-500" : "border-text/50"}`}
                            placeholder='Enter folder name ....'
                        />
                        {errors.folderName && (
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

export default AddFolderForm;
