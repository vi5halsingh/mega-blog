import { Client, Account, ID } from 'appwrite';
import appWrite from '../config/config';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(appWrite.endpoint)
    .setProject(appWrite.projectId);

// Initialize Account
const account = new Account(client);

// Auth state actions
export const AUTH_ACTIONS = {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout'
};

// Create a new account
async function createAccount({ email, password, name }) {
    try {
        const newUser = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if (newUser) {
            // Call login function to automatically log in the user
            return await login({ email, password });
        }
        return null;
    } catch (error) {
        throw error;
    }
}

// Login user
 async function login({ email, password }) {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
}

// Get current user
 async function getCurrentUser() {
    try {
        console.log("Fetching current user...", await account.get());
        return await account.get();
    } catch (error) {
        console.error("User not authenticated", error);
        return null;
    }
}

// Logout user
 async function logout() {
    try {
        return await account.deleteSession('current');
    } catch (error) {
        console.error("Logout failed", error);
        throw error;
    }
}

// Update user's name
 async function updateName({ name }) {
    try {
        return await account.updateName(name);
    } catch (error) {
        throw error;
    }
}

// Update user's password
 async function updatePassword({ password, oldPassword }) {
    try {
        return await account.updatePassword(password, oldPassword);
    } catch (error) {
        throw error;
    }
}
const authServices = {
    createAccount,
    login,
    getCurrentUser,
    logout,
    updateName,
    updatePassword
}
export default authServices;