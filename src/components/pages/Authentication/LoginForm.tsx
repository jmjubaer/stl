import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
import PasswordInput from "./PasswordInput";
import { getMe, loginUser } from "@/src/services/AuthServices";
import Swal from "sweetalert2";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hook";
import ShowAlert from "@/src/utils/ShowAlert";
import { closeAuthModal } from "@/src/redux/features/modal/modalSlice";
type TInputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const [isOpenResetModal, setIsOpenResetModal] = useState(false);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const dispatch = useAppDispatch();
    const handleLogin: SubmitHandler<TInputs> = async (data) => {
        try {
            Swal.fire({
                title: "User Logging...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
                customClass: { container: "swal-z-index" },
            });
            const res = await loginUser(data);
            if (res.success) {
                ShowAlert("Success", "success", "User logged in successfully");
                dispatch(closeAuthModal());
                try {
                    const userData = await getMe(res.data);
                    const user = {
                        ...userData.data.userInfo,
                    };
                    dispatch(setUser({ token: res.data, user }));
                } catch (error) {
                    ShowAlert(
                        "Error",
                        "error",
                        error instanceof Error
                            ? error.message
                            : "Failed to fetch user data, please try again",
                    );
                }
                reset();
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

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
                {/* Email */}
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
                        <span className='text-red-500'> Email is required</span>
                    )}
                </div>{" "}
                {/* Password */}
                <div className='mt-3 '>
                    <label className='block mb-1 text-s font-medium text-text/80'>
                        Password :
                    </label>
                    <PasswordInput
                        register={register}
                        name='password'
                        errors={errors}
                    />
                </div>
                <button
                    className='border bg-blue-700 text-white hover:bg-primary rounded-xl px-5 py-2 w-full mt-5 cursor-pointer hover:text-white duration-300'
                    type='submit'>
                    Sign In
                </button>
                <button
                    onClick={() => setIsOpenResetModal(true)}
                    type='button'
                    className='text-blue-700 hover:text-blue-800 mt-2 cursor-pointer block w-full text-center'>
                    Forgot Password?
                </button>
            </form>
            <ResetPasswordForm
                isOpenResetModal={isOpenResetModal}
                setIsOpenResetModal={setIsOpenResetModal}
            />
        </>
    );
};

export default LoginForm;
