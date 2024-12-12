export interface BasicResponse {
    status?: boolean;
    message: string;
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
        links?: any;
    };
    links?: {
        first: string;
        last: string;
        prev: string;
        next: string;
    }
    data: any;
}