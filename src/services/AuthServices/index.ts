"use server";
import { TLogin, TRegister } from "@/src/types";

export const registerUser = async (userData: TRegister) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            },
        );
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
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            },
        );
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
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: ` ${token}`,
                },
            },
        );
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
