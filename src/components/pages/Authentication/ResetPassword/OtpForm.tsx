"use client";
import Tooltip from "antd/es/tooltip";
import { useEffect, useRef, useState } from "react";

type TProps = {
    setForm: React.Dispatch<React.SetStateAction<string>>;
};
const OtpForm = ({ setForm }: TProps) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // allow only single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < 6 - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Timer logic (optional)
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleVerifyOtp = () => {
        setForm("new-password");
    };
    const handleResend = () => {
        setOtp(Array(6).fill(""));
        inputsRef.current[0]?.focus();
        setTimeLeft(60)
    };

    return (
        <div className=''>
            <div className='flex gap-3 justify-center mt-5'>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type='text'
                        maxLength={1}
                        value={digit}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className='w-12 h-12 text-center text-xl font-semibold 
                     border border-text/50 rounded-lg
                     focus:outline-none focus:ring-2 
                     focus:ring-primary focus:border-primary
                     transition-all duration-200'
                    />
                ))}
            </div>

            {/* Resend Section */}
            <div className='text-sm text-gray-500 dark:text-gray-400 w-fit mx-auto mt-4'>
                <span>Didn`t receive the code? </span>
                <Tooltip
                    title={
                        timeLeft > 0 ? `Resend OTP in ${timeLeft} seconds` : ""
                    }
                    placement={"top"}>
                    <button
                        disabled={timeLeft > 0}
                        type='button'
                        onClick={handleResend}
                        className='text-blue-700 cursor-pointer font-semibold hover:underline disabled:cursor-not-allowed disabled:opacity-80'>
                        Resend OTP
                    </button>
                </Tooltip>
            </div>

            <div className='flex justify-end gap-5 mt-5'>
                <button
                    onClick={() => setForm("email")}
                    className='border hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'>
                    Back
                </button>
                <button
                    onClick={handleVerifyOtp}
                    className='border bg-blue-700 text-white hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'>
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default OtpForm;
