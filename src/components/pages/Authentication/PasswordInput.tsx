/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
type TProps = {
    register: UseFormRegister<any>;
    name: string;
    errors: ReturnType<typeof useForm>["formState"]["errors"];
    placeholder?: string;
};
const PasswordInput = ({
    register,
    name,
    errors,
    placeholder = "Enter Password ....",
}: TProps) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className='relative mt-2 h-fit'>
            <TbLockPassword className='absolute left-3.5 bottom-2.5 text-text text-xl' />
            <input
                {...register(name, {
                    required: true,
                })}
                type={isShowPassword ? "text" : "password"}
                className={`border w-full px-4 py-2 rounded-2xl pl-10 outline-0 ${errors?.[name] ? "border-red-500" : "border-text/50"}`}
                placeholder={placeholder}
            />
            {errors?.[name] && (
                <span className='text-red-500'> Password is required</span>
            )}

            {/* Toggle button */}
            <button
                type='button'
                onClick={() => setIsShowPassword((prev) => !prev)}
                className='absolute right-3.5 bottom-2.5 text-text text-xl cursor-pointer'>
                {!isShowPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
        </div>
    );
};

export default PasswordInput;
