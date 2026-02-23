"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";

type TInputs = {
    folderName: string;
};
type TProps = {
    isOpenTagModal: boolean;
    setIsOpenTagModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddTagForm = ({ isOpenTagModal, setIsOpenTagModal }: TProps) => {
    const [color, setColor] = useState<string>("");
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleCreateFolder: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        setIsOpenTagModal(false);
        reset();
    };

    const handleCancel = () => {
        setIsOpenTagModal(false);
        reset();
    };

    return (
        <>
            <Modal
                open={isOpenTagModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'>
                <div className='text-base'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>
                        {" "}
                        New Tag
                    </h2>
                    <form onSubmit={handleSubmit(handleCreateFolder)}>
                        {/* Tag Name */}
                        <div className=''>
                            <label className='block mb-2 text-s font-medium text-text/80'>
                                Tag Name :
                            </label>
                            <input
                                {...register("folderName", { required: true })}
                                type='text'
                                className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.folderName ? "border-red-500" : "border-text/50"}`}
                                placeholder='Enter tag name ....'
                            />
                            {errors.folderName && (
                                <span className='text-red-500'>
                                    {" "}
                                    Tag name is required
                                </span>
                            )}
                        </div>

                        {/* Color */}
                        <div className='mt-2'>
                            <label className='block mb-2 font-medium text-text/80'>
                                Select Color :
                            </label>
                            <div className='flex flex-wrap gap-3 mt-2'>
                                {[
                                    "#9952E0",
                                    "#1A8CFF",
                                    "#28BD66",
                                    "#F97A1F",
                                    "#1DBAC9",
                                    "#ED7CB5",
                                ].map((c) => (
                                    <button
                                        onClick={() => setColor(c)}
                                        type='button'
                                        key={c}
                                        className={`w-10 h-10 p-0.5 rounded-full cursor-pointer ${
                                            color === c
                                                ? "border-2 border-text"
                                                : ""
                                        }`}>
                                        <div
                                            className='w-full h-full rounded-full'
                                            style={{ backgroundColor: c }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Button area */}
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

export default AddTagForm;
