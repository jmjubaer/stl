"use server";

import config from "@/src/config";
import { revalidateTag } from "next/cache";

export const getTags = async (token: string) => {
    try {
        const response = await fetch(`${config.BASE_API}/tag`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            next: {
                tags: ["Tags"],
            },
        });
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
        const response = await fetch(`${config.BASE_API}/tag/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(payload),
        });
        revalidateTag("Tags", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating tags:", error);
        throw new Error("Failed to creating tags");
    }
};
export const deleteTags = async (token: string, tagId: string) => {
    try {
        const response = await fetch(`${config.BASE_API}/tag/${tagId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        });
        revalidateTag("Tags", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting tags:", error);
        throw new Error("Failed to deleting tags");
    }
};
