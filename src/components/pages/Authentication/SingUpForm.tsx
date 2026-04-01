import React, { use, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { TbLockPassword } from "react-icons/tb";
import PasswordInput from "./PasswordInput";
import { registerUser } from "@/src/services/AuthServices";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/src/redux/hook";
import { setUser } from "@/src/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";
type TInputs = {
    name: string;
    email: string;
    password: string;
};
type TProps = {
    isOpenAuthModal: boolean;
    setIsOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const SingUpForm = ({ isOpenAuthModal, setIsOpenAuthModal }: TProps) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const dispatch = useAppDispatch();
    const handleSignUp: SubmitHandler<TInputs> = async (data) => {
        console.log(data);

        try {
            const res = await registerUser(data);
            if (res.success) {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: res.message,
                    draggable: true,
                });
                setIsOpenAuthModal(false);
                reset();
                const user = jwtDecode(res.data);
                dispatch(setUser({ token: res.data, user}));
            } else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: res.message,
                    draggable: true,
                });
            }
            console.log(res);
        } catch (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                draggable: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSignUp)}>
            {/* Display Name */}
            <div className='mt-3 '>
                <label className='block mb-1 text-s font-medium text-text/80'>
                    Display Name :
                </label>
                <div className='relative mt-2'>
                    <CiUser className='absolute left-3.5 bottom-2.5 text-text text-xl' />
                    <input
                        {...register("name", {
                            required: true,
                        })}
                        type='text'
                        className={`border w-full px-4 py-2 rounded-2xl pl-10 outline-0 ${errors.name ? "border-red-500" : "border-text/50"}`}
                        placeholder='Enter Your Name ....'
                    />
                </div>
                {errors.name && (
                    <span className='text-red-500'> Name is required</span>
                )}
            </div>{" "}
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
                        className={`border w-full px-4 py-2 rounded-2xl pl-10 outline-0 ${errors.name ? "border-red-500" : "border-text/50"}`}
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
                    placeholder='Enter Password ....'
                />
            </div>
            <button
                className='border bg-blue-700 text-white hover:bg-primary rounded-xl px-5 py-2 w-full mt-5 cursor-pointer hover:text-white duration-300'
                type='submit'>
                Sign Up
            </button>
        </form>
    );
};

export default SingUpForm;
