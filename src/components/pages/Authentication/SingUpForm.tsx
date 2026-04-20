/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import PasswordInput from "./PasswordInput";
import { getMe, registerUser } from "@/src/services/AuthServices";
import { useAppDispatch } from "@/src/redux/hook";
import { setUser } from "@/src/redux/features/auth/authSlice";
import ShowAlert from "@/src/utils/ShowAlert";
import { closeAuthModal } from "@/src/redux/features/modal/modalSlice";
import Swal from "sweetalert2";
type TInputs = {
    name: string;
    email: string;
    password: string;
};

const SingUpForm = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const dispatch = useAppDispatch();
    const handleSignUp: SubmitHandler<TInputs> = async (data) => {
        try {
            Swal.fire({
                title: "User Registering...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
                customClass: { container: "swal-z-index" },
            });
            const res = await registerUser(data);
            if (res.success) {
                ShowAlert("Success", "success", "User registered successfully");
                dispatch(closeAuthModal());
                reset();
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
                        "Failed to fetch user data, please try again",
                    );
                }
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
