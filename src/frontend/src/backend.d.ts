import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface Product {
    id: bigint;
    featured: boolean;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    weightGrams: number;
    makingCharge: bigint;
}
export enum Category {
    mens = "mens",
    collections = "collections",
    necklaces = "necklaces",
    earrings = "earrings",
    rings = "rings",
    bracelets = "bracelets"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(productId: bigint): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getGoldPrice(): Promise<bigint>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateGoldPrice(newPrice: bigint): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
