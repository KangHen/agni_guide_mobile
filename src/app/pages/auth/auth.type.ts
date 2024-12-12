import { User } from "./user.type"

export type AuthForm = {
    email: string;
    password: string;
    terms: boolean;
}

export type AuthResponse = {
    data: User;
    token: string;
}

export type Terms = {
    id: number;
    title: string;
    content: string;
    slug: string;
    image: string;
    status: string;
    type: string;
    is_published: number;
    user_id: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;

    user?: User;
}

export type TermsRepsonse = {
    data: Terms;
}