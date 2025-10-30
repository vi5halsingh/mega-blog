import { Client, Databases, Query, ID, Storage } from 'appwrite';
import appWrite from '../config/config';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(appWrite.endpoint)
    .setProject(appWrite.projectId);

// Initialize Databases
const databases = new Databases(client);

// Initialize Storage for file uploads
const storage = new Storage(client);

// Create a new post
export async function createPost({ title, content, featuredImage, status, userId }) {
    try {
        return await databases.createDocument(
            appWrite.databaseId,
            appWrite.collectionId,
            ID.unique(),
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );
    } catch (error) {
        throw error;
    }
}

// Update an existing post
export async function updatePost(postId, { title, content, featuredImage, status }) {
    try {
        return await databases.updateDocument(
            appWrite.databaseId,
            appWrite.collectionId,
            postId,
            {
                title,
                content,
                featuredImage,
                status,
            }
        );
    } catch (error) {
        throw error;
    }
}

// Delete a post
export async function deletePost(postId) {
    try {
        await databases.deleteDocument(
            appWrite.databaseId,
            appWrite.collectionId,
            postId
        );
        return true;
    } catch (error) {
        throw error;
    }
}

// Get a single post
export async function getPost(postId) {
    try {
        return await databases.getDocument(
            appWrite.databaseId,
            appWrite.collectionId,
            postId
        );
    } catch (error) {
        throw error;
    }
}

// Get all posts
export async function getPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await databases.listDocuments(
            appWrite.databaseId,
            appWrite.collectionId,
            queries
        );
    } catch (error) {
        throw error;
    }
}

// Get posts by user ID
export async function getUserPosts(userId) {
    try {
        return await databases.listDocuments(
            appWrite.databaseId,
            appWrite.collectionId,
            [
                Query.equal("userId", userId),
                Query.orderDesc("$createdAt")
            ]
        );
    } catch (error) {
        throw error;
    }
}
export async function uploadFile(file) {
    try {
        // `file` should be a File (browser) or a ReadableStream depending on environment
        const result = await storage.createFile(
            appWrite.bucketId,
            ID.unique(),
            file
        );
        return result;
    } catch (error) {
        console.error("appwrite services :: uploadFile :: error", error);
        throw error; // be consistent with other functions that throw on error
    }
}
export async function deleteFile(fileID) {
    try {
        await storage.deleteFile(
            appWrite.bucketId,
            fileID
        )
        return true;
    } catch (error) {
         console.error("appwrite services :: deleting file :: error", error);
        throw error; // be consistent with other functions that throw on error
    }
}
export async function previewFile(fileID){
   try {
     return storage.getFilePreview(
         appWrite.bucketId,
         fileID
     )
   } catch (error) {
     console.error("appwrite services :: preview file :: error", error);
        throw error; // be consistent with other functions that throw on error
   }
}

