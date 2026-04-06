"use server";
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
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        throw new Error("Failed to fetch bookmarks");
    }
};
