// src/services/FeedbackServices.ts
"use server";

import config from "@/src/config";

type TFeedback = {
    name: string;
    email: string;
    feedbacks: { type: string; message: string }[];
};
export const sendFeedback = async (payload: TFeedback) => {
    try {
        const response = await fetch(
            `${config.BASE_API}/user/feedback`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
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
