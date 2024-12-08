import { User } from "../auth/user.type";

export type News = {
    id: number;
    title: string;
    content: string;
    image: string;
    read_count: number;
    user_id: number;
    created_at: string;
    updated_at: string;

    /** Relation */
    user?: User;
}