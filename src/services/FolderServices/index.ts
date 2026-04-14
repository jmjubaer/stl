"use server";

import { revalidateTag } from "next/cache";

export const getFolder = async (token: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/folder`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                next: {
                    tags: ["Folders"],
                },
            },
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching folders:", error);
        throw new Error("Failed to fetch folders");
    }
};
export const createFolder = async (
    token: string,
    payload: { name: string },
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/folder/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            },
        );
        // revalidateTag("Folders", "everything");
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating folders:", error);
        throw new Error("Failed to creating folders");
    }
};

export const deleteFolder = async (token: string, folderId: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/folder/${folderId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            },
        );
        revalidateTag("Folders", "everything");
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error delate folders:", error);
        throw new Error("Failed to delate folders");
    }
};

export const renameFolder = async (
    token: string,
    folderId: string,
    payload: { newName: string },
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/folder/${folderId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            },
        );
        revalidateTag("Folders", "everything");
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error delate folders:", error);
        throw new Error("Failed to delate folders");
    }
};

export const getShareFolder = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/folder/share/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching folders:", error);
        throw new Error("Failed to fetch folders");
    }
};
