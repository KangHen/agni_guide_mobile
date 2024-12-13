import { BasicResponse } from "./basic-response.type";

export type Category = {
    id: number;
    name: string;
}

export type CategoryResponse = BasicResponse & {
    data: Category[];
}