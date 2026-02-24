import React, { SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TbLockPassword } from "react-icons/tb";
import PasswordInput from "../PasswordInput";
type TInputs = {
    password: string;
};
type TProps = {
    setForm: React.Dispatch<React.SetStateAction<string>>;
    setIsOpenResetModal: React.Dispatch<SetStateAction<boolean>>;
};
const NewPasswordForm = ({ setForm, setIsOpenResetModal }: TProps) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleChangePassword: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        // setForm("otp");
    };
    const handleCancel = () => {
        setIsOpenResetModal(false);
        setForm("email");
        reset();
    };
    return (
        <form onSubmit={handleSubmit(handleChangePassword)}>
            <div className='mt-3 '>
                <label className='block mb-1 text-s font-medium text-text/80'>
                    New Password :
                </label>
                <PasswordInput
                    register={register}
                    name='password'
                    errors={errors}
                    placeholder='New Password ****'
                />
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
                    Change Password
                </button>
            </div>
        </form>
    );
};

export default NewPasswordForm;
