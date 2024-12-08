export enum Role {
    Dev = -1,
    Admin = 1,
    Member = 2,
    Guest = 3,
}

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    village_id: number|null;
    is_active: number;
    role_id: Role;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}