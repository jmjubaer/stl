"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiEnvelopeSimpleLight } from "react-icons/pi";

type TInputs = {
    email: string;
};
type TProps = {
    isOpenResetModal: boolean;
    setIsOpenResetModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ResetPasswordForm = ({isOpenResetModal,setIsOpenResetModal}:TProps) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleCreateFolder: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        setIsOpenResetModal(false);
        reset();
    };

    const handleCancel = () => {
        setIsOpenResetModal(false);
        reset();
    };

    return (
        <>
            <Modal
                open={isOpenResetModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'>
                <div className='text-base'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>
                        {" "}
                        New Folder
                    </h2>
                    <form onSubmit={handleSubmit(handleCreateFolder)}>
                        <div className='mt-3 '>
                            <label className='block mb-1 text-s font-medium text-text/80'>
                                Email :
                            </label>
                            <div className='relative mt-2'>
                                <PiEnvelopeSimpleLight className='absolute left-3.5 bottom-2.5 text-text text-xl' />
                                <input
                                    {...register("email", {
                                        required: true,
                                    })}
                                    type='text'
                                    className={`border w-full px-4 py-2 rounded-2xl pl-10 outline-0 ${errors.email ? "border-red-500" : "border-text/50"}`}
                                    placeholder='Enter Email ....'
                                />
                            </div>
                            {errors.email && (
                                <span className='text-red-500'>
                                    {" "}
                                    Email is required
                                </span>
                            )}
                        </div>{" "}
                        <div className='flex justify-end gap-5 mt-5'>
                            <button
                                onClick={handleCancel}
                                className='border hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'>
                                Cancel
                            </button>
                            <button
                                className='border bg-blue-700 text-white hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'
                                type='submit'>
                                Sent OTP
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default ResetPasswordForm;
