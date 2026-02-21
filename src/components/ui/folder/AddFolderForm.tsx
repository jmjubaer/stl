"use client";
import React from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";

type TInputs = {
    folderName: string;
};
type TProps = {
    isOpenFolderModal: boolean;
    setIsOpenFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddFolderForm = ({ isOpenFolderModal, setIsOpenFolderModal }: TProps) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleCreateFolder: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        setIsOpenFolderModal(false);
        reset();
    };

    const handleCancel = () => {
        setIsOpenFolderModal(false);
        reset();
    };

    return (
        <>
            <Modal
                open={isOpenFolderModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'>
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
                            className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.folderName ? "border-red-500" : "border-text/5  0"}`}
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
