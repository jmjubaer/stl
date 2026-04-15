import React, { SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PasswordInput from "../PasswordInput";
import Swal from "sweetalert2";
import { resetPassword } from "@/src/services/AuthServices";
import ShowAlert from "@/src/utils/ShowAlert";
type TInputs = {
    password: string;
};
type TProps = {
    otp: string;
    email: string;
    setForm: React.Dispatch<React.SetStateAction<string>>;
    setIsOpenResetModal: React.Dispatch<SetStateAction<boolean>>;
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};
const NewPasswordForm = ({
    setForm,
    setIsOpenResetModal,
    email,
    setOtp,
    otp,
}: TProps) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleCancel = () => {
        setIsOpenResetModal(false);
        setForm("email");
        reset();
    };
    const handleChangePassword: SubmitHandler<TInputs> = async (data) => {
        try {
            Swal.fire({
                title: "Changing...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
                customClass: { container: "swal-z-index" },
            });
            const res = await resetPassword({
                email,
                newPassword: data.password,
                otp: Number(otp),
            });
            if (res.success) {
                Swal.fire({
                    title: "Password Changed",
                    icon: "success",
                    text: "Your password is reset successful.",
                    draggable: true,

                    customClass: {
                        container: "swal-z-index",
                    },
                    showConfirmButton: false,
                    timer: 2500,
                });
                handleCancel();
                setOtp(Array(6).fill(""));
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
