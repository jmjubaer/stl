"use server";
import config from "@/src/config";
import { TLogin, TRegister } from "@/src/types";
export const registerUser = async (userData: TRegister) => {
    try {
        const response = await fetch(`${config.BASE_API}/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "failed to register user",
        };
    }
};

export const loginUser = async (userData: TLogin) => {
    try {
        const response = await fetch(`${config.BASE_API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "failed to Login user",
        };
    }
};
export const getMe = async (token: TLogin) => {
    try {
        const response = await fetch(`${config.BASE_API}/user/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: ` ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "failed to get me",
        };
    }
};

export const sentEmail = async (email: string) => {
    try {
        const response = await fetch(`${config.BASE_API}/auth/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "failed to send otp",
        };
    }
};

export const verifyOtp = async (payload: { email: string; otp: number }) => {
    try {
        const response = await fetch(`${config.BASE_API}/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "failed to verify otp",
        };
    }
};

export const resetPassword = async (payload: {
    email: string;
    otp: number;
    newPassword: string;
}) => {
    try {
        const response = await fetch(`${config.BASE_API}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "failed to reset password",
        };
    }
};
