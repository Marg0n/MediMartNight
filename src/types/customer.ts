export interface IUser {
    _id?: string;
    name: string;
    email: string;
    role: "admin" | "customer";
    status: "active" | "inactive";
    needsPasswordChange?: boolean;
    passwordChangedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
    address?: string;
    bloodGroup?: string;
    phone?: string;
    iat?: number;
    exp?: number;
}
