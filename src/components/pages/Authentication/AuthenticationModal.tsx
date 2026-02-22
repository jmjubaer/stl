"use client";
import logo from "@/src/assets/logo/stl-logo-dark.png";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";

type TInputs = {
    folderName: string;
};
type TProps = {
    isOpenAuthModal: boolean;
    setIsOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AuthenticationModal = ({
    isOpenAuthModal,
    setIsOpenAuthModal,
}: TProps) => {
    const [authMode, setAuthMode] = useState("signin");
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleCreateFolder: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        setIsOpenAuthModal(false);
        reset();
    };

    const handleCancel = () => {
        setIsOpenAuthModal(false);
        reset();
    };

    return (
        <>
            <Modal
                open={isOpenAuthModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'>
                <div className='text-base'>
                    <Image src={logo} alt='Logo' className='w-24 mx-auto' />
                    <h2 className='text-2xl font-bold text-center'>
                        Save The Link
                    </h2>
                    <p className='text-center'>
                        Sign in or create an account to get started
                    </p>

                    <div className='bg-text/10 p-1 px-1.5 rounded-full mt-5 flex items-center gap-2'>
                        <button
                            onClick={() => setAuthMode("signin")}
                            className={` text-whit text-sm  rounded-full px-5 py-1.5 w-full font-bold cursor-pointer ${authMode === "signin" ? "bg-white/50" : ""}`}>
                            Sign In
                        </button>{" "}
                        <button
                            onClick={() => setAuthMode("signup")}
                            className={` text-whit text-sm  rounded-full px-5 py-1.5 w-full font-bold cursor-pointer ${authMode === "signup" ? "bg-white/50" : ""}`}>
                            Sign Up
                        </button>
                    </div>
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

export default AuthenticationModal;
