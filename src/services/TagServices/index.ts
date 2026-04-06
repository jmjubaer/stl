"use server";

import { TTag } from "@/src/types";

export const getTags = async (token: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/tag`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            },
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw new Error("Failed to fetch tags");
    }
};
export const createTags = async (
    token: string,
    payload: { name: string; color: string },
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/tag/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            },
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating tags:", error);
        throw new Error("Failed to creating tags");
    }
};
