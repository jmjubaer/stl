import { TTag } from "./Tag.type";
export interface TData {
    bookmarks: TBookmark[];
    folders: TFolder[];
    pinnedBookmarks: TBookmark[];
}
export interface TSortBy {
    name: string;
    value: string;
}
export interface TBookmark {
    _id: string;
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
    isPinned: boolean;
    pinnedAt?: Date;
    // optional
    isFavorite: boolean;
    visitCount: number;
    lastVisitedAt?: Date;
    isPublic: boolean;
}
export interface TFolder {
    _id: string;
    userId: string;
    name: string;
    bookmarks?: TBookmark[];
}


export interface TLinkMetaInfo {
    url: string;
    title: string;
    siteName?: string;
    mediaType: string;
    contentType: string;
    image: string[] | [];
    videos: string[] | [];
    favicon: string[] | [];
    charset: string;
    description?: string;
    author?: string;

}