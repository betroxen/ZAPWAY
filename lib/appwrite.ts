
import { Client, Account, Databases, ID } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);  // Server-side only

export const account = new Account(client);
export const db = new Databases(client);

export const DATABASE_ID = process.env.DATABASE_ID!;
export const USERS_COLLECTION_ID = process.env.USERS_COLLECTION_ID!;

// This function is for one-time setup and should be run securely
export async function initAppwrite() {
  try {
    // It's better to create the database manually in the Appwrite console
    // and then create the collection from there.
    // Running collection creation here is possible but can lead to errors if run more than once.
    await db.createCollection(DATABASE_ID, 'users', USERS_COLLECTION_ID, [
        { key: 'email', type: 'string', required: true, size: 255, array: false },
        { key: 'passwordHash', type: 'string', required: true, size: 255, array: false },
        // Add other attributes as needed
    ]);
    console.log('Users collection created successfully.');
  } catch (error) {
    // If the collection already exists, Appwrite will throw an error.
    // You can handle that specific error case if you want to make this script idempotent.
    console.error('Error creating collection:', (error as Error).message);
  }
}
