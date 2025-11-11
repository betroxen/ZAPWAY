import { Models } from 'appwrite';

export type User = Models.User<Models.Preferences>;

// FIX: Export RegisterData interface to be used in AuthContext
export interface RegisterData {
    username: string;
    email: string;
    password: string;
}
