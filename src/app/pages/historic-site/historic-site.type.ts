import { Category } from "src/app/shared/caategory.type";
import { User } from "../auth/user.type";

export type HistoricSite = {
    id: number;
    name: string;
    description: string;
    images: string;
    location: string;
    latitude: number;
    longitude: number;
    slug: string;
    vt?: string;
    user_id: number;
    created_at: string;
    updated_at: string;

    user?: User;
    category?: Category;
}

export type HistoricSiteParams = {
    // page: number;
    search?: string;
    limit?: number;
    categories?: string;
}

export type ShowcaseParams = {
    limit?: number;
    pinned?: number;
    populer?: number;
    explore?: number;
    exclude?: string;
}


export type HistoricSiteResponse = {
    data: HistoricSite[];
}

export type GetHistoricSite = {
    data: HistoricSite;
}
