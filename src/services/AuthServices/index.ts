"use server";
import { TLogin, TRegister } from "@/src/types";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
export const registerUser = async (userData: TRegister) => {
    try {
        const response = await fetch(`${baseUrl}/user/create`, {
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
        const response = await fetch(`${baseUrl}/auth/login`, {
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
        const response = await fetch(`${baseUrl}/user/me`, {
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
        const response = await fetch(`${baseUrl}/auth/send-otp`, {
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
        const response = await fetch(`${baseUrl}/auth/verify-otp`, {
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
