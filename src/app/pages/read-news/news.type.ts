import { BasicResponse } from "src/app/shared/basic-response.type";
import { User } from "../auth/user.type";

export type News = {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
    read_count: number;
    user_id: number;
    created_at: string;
    updated_at: string;

    /** Relation */
    user?: User;
}

export type NewsForm = {
    title: string;
    content: string;
    image: string;
}

export type NewsResponse = BasicResponse & {
    data: News|News[]
}

export type NewsParams = {
    page: number;
}
