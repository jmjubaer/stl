import { TTag } from "./Tag.type";

export type TLink = {
    image: string;
    link: string;
    title: string;
    description: string;
    tag: TTag[];
    createdAt: Date;
    updatedAt: Date;        
}