"use server";
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
