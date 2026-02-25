"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import OtpForm from "./OtpForm";
import logo from "@/src/assets/logo/stl-logo-dark.png";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import NewPasswordForm from "./NewPasswordForm";
type TInputs = {
    email: string;
};
type TProps = {
    isOpenResetModal: boolean;
    setIsOpenResetModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ResetPasswordForm = ({
    isOpenResetModal,
    setIsOpenResetModal,
}: TProps) => {
    const [form, setForm] = useState("email");
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleSendOtp: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        setForm("otp");
    };

    const handleCancel = () => {
        setIsOpenResetModal(false);
        setForm("email");
        reset();
    };
    useEffect(() => {
        reset();
    }, [isOpenResetModal]);
    return (
        <>
            <Modal
                open={isOpenResetModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'>
                <div className='text-base'>
                    <Image src={logo} alt='Logo' className='w-24 mx-auto' />
                    <h2 className='text-2xl font-bold text-center'>
                        {form === "email"
                            ? "Reset Password"
                            : form === "otp"
                              ? "Enter OTP"
                              : "New Password"}
                    </h2>
                    <p className='text-center'>
                        {form === "email"
                            ? "Enter your email to receive a reset code"
                            : form === "otp"
                              ? "Enter the 6-digit code sent to your email"
                              : "Enter your new password for change"}
                    </p>
                    {form === "email" ? (
                        <form onSubmit={handleSubmit(handleSendOtp)}>
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
                    ) : form === "otp" ? (
                        <OtpForm setForm={setForm} />
                    ) : (
                        <NewPasswordForm
                            setForm={setForm}
                            setIsOpenResetModal={setIsOpenResetModal}
                        />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default ResetPasswordForm;
