import { TTag } from "./Tag.type";

export interface TLink {
    id: string;
    url: string;
    domain?: string;
    title: string;
    description?: string;
    image?: string;
    favicon?: string;
    siteName?: string;
    previewStatus: "PENDING" | "SUCCESS" | "FAILED";
    tags: TTag[];
    createdAt: string;
    updatedAt: Date;
    
    // optional
    isFavorite: boolean;
    visitCount: number;
    lastVisitedAt?: Date;
    isPublic: boolean;
}
export interface TFolder {
    id: string;
    userId: string;
    name: string;
}
