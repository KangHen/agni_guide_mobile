import { Category } from "src/app/shared/caategory.type";
import { User } from "../auth/user.type";

export type HistoricSite = {
    id: number;
    name: string;
    description: string;
    image: string;
    location: string;
    latitude: number;
    longitude: number;
    slug: string;
    user_id: number;
    created_at: string;
    updated_at: string;

    User?: User;
    Category?: Category;
}

export type HistoricSiteParams = {
    // page: number;
    search?: string;
    limit?: number;
    categories?: string;
}

export type HistoricSiteResponse = {
    data: HistoricSite[];
}

export type GetHistoricSite = {
    data: HistoricSite;
}
