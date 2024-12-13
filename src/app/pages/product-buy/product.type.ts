import { BasicResponse } from "src/app/shared/basic-response.type";

export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    sizes: string;
    quantity: number;
    variant: null;
    images: string;
    search: null;
    user_id: number;
    historic_site_id: number|null;
    is_sold_out: number;
    deleted_at: string|null;
    created_at: string;
    updated_at: string
}

export type ProductResponse = BasicResponse & {
    data: Product[];
}

export type GetProduct = BasicResponse & {
    data: Product;
}

export type ProductParams = {
    page: number;
    search?: string;
    limit?: number
}