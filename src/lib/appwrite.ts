import { Client, Account, Databases, ID } from 'appwrite';

export const client = new Client();

// Values taken from the user-provided documentation.
// In a production environment, these should be managed via environment variables.
const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = 'zapway';
export const DB_ID = 'zapway_db';
export const USERS_COL = 'users';

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };
