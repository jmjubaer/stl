"use server";

import { TBookmarkPayload } from "@/src/types";
import { revalidateTag } from "next/cache";

type TQueryParams = {
    name: string;
    value: string | number | boolean;
};
export const getBookmarks = async (
    token: string,
    queryParams?: TQueryParams[],
) => {
    try {
        const params = new URLSearchParams();
        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }
        const queryString = params.toString();
        const url = queryString
            ? `${process.env.NEXT_PUBLIC_BASE_API}/bookmark?${queryString}`
            : `${process.env.NEXT_PUBLIC_BASE_API}/bookmark`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            next: {
                tags: ["Bookmarks"],
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        throw new Error("Failed to fetch bookmarks");
    }
};

export const createBookmark = async (
    token: string,
    payload: TBookmarkPayload,
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookmark/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            },
        );
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating bookmarks:", error);
        throw new Error("Failed to creating bookmarks");
    }
};
export const updateBookmark = async (
    token: string,
    payload: TBookmarkPayload,
    bookmarkId: string,
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookmark/${bookmarkId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            },
        );
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating bookmarks:", error);
        throw new Error("Failed to updating bookmarks");
    }
};
export const AddToFolder = async (
    token: string,
    payload: { bookmarkIds: string[]; folderId: string },
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookmark/add-to-folder`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            },
        );
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error add to folder bookmarks:", error);
        throw new Error("Failed to add to folder bookmarks");
    }
};
export const deleteBookmark = async (token: string, bookmarkId: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookmark/${bookmarkId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            },
        );
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting bookmarks:", error);
        throw new Error("Failed to delete bookmarks");
    }
};
export const togglePinBookmark = async (
    token: string,
    payload: { bookmarkIds: string[]; isPinned: boolean },
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookmark/pin`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            },
        );
        revalidateTag("Bookmarks", "everything");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error toggling pin bookmark:", error);
        throw new Error("Failed to toggle pin bookmark");
    }
};
export const linkPreview = async (url: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookmark/link-preview?url= ${url}`,
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
        console.error("Error link preview:", error);
        throw new Error("Failed link preview");
    }
};
