import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { TbLockPassword } from "react-icons/tb";
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
    const handleSignUp: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        setIsOpenAuthModal(false);
        reset();
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
                <div className='relative mt-2'>
                    <TbLockPassword className='absolute left-3.5 bottom-2.5 text-text text-xl' />
                    <input
                        {...register("password", {
                            required: true,
                        })}
                        type='password'
                        className={`border w-full px-4 py-2 rounded-2xl pl-10 outline-0 ${errors.password ? "border-red-500" : "border-text/50"}`}
                        placeholder='Enter Password ....'
                    />
                </div>
                {errors.password && (
                    <span className='text-red-500'> Password is required</span>
                )}
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
