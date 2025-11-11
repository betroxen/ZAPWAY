import { account, databases, ID, DB_ID, USERS_COL } from '../lib/appwrite';
import type { User } from './types';

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  // FIX: Add a refresh method that checks for an active session.
  // This resolves errors where `refresh` was called but not defined.
  async refresh(): Promise<User | null> {
    return this.getCurrentUser();
  },

  async login(email: string, password: string): Promise<User> {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  },

  async register(username: string, email: string, password: string): Promise<User> {
    // 1. Create the Appwrite Auth user
    const newAccount = await account.create(ID.unique(), email, password, username);

    // 2. Log the new user in to create a session required for DB operations
    await account.createEmailPasswordSession(email, password);

    // 3. Create a corresponding user document in the database
    // This requires the 'users' collection to have write access for 'users'.
    try {
        await databases.createDocument(DB_ID, USERS_COL, newAccount.$id, {
            email: email,
            username: username,
            role: 'USER',
        });
    } catch(dbError) {
        // If DB write fails, clean up the created auth user for consistency
        // This requires server-side logic and elevated permissions not available here.
        // For this client-side implementation, we'll log the error.
        console.error("Error creating user profile in DB. Please configure collection permissions.", dbError);
        // We can still proceed with the user being logged in.
    }

    return newAccount;
  },

  async logout(): Promise<void> {
    return await account.deleteSession('current');
  },

  async exportUserData(userId: string): Promise<any> {
    return await databases.getDocument(DB_ID, USERS_COL, userId);
  },

  async deleteAccount(userId: string): Promise<void> {
    // This assumes the 'users' collection allows users to delete their own document.
    await databases.deleteDocument(DB_ID, USERS_COL, userId);
    // Deleting the auth user account itself requires server-side implementation for security.
    // Here we will just log the user out.
    await account.deleteSession('current');
  },
};