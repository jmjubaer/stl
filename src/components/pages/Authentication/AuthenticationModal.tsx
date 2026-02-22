"use client";
import logo from "@/src/assets/logo/stl-logo-dark.png";
import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import LoginForm from "./LoginForm";

type TProps = {
    isOpenAuthModal: boolean;
    setIsOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AuthenticationModal = ({
    isOpenAuthModal,
    setIsOpenAuthModal,
}: TProps) => {
    const [authMode, setAuthMode] = useState("signin");

    const handleCancel = () => {
        setIsOpenAuthModal(false);
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

                    {/* Toggle button */}
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

                    {/* Form Section */}
                    {authMode === "signin" ? (
                        <LoginForm
                            isOpenAuthModal={isOpenAuthModal}
                            setIsOpenAuthModal={setIsOpenAuthModal}
                        />
                    ) : (
                        <div className='text-center mt-5'>
                            {" "}
                            Sign Up Form Coming Soon...
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default AuthenticationModal;
