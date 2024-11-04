import { openDB } from 'idb'; 

export const openDatabase = async () => {
    return openDB('ImageDatabase', 1, {
        upgrade(db) {
            db.createObjectStore('images', { keyPath: 'url' });
        },
    });
};

export const getImageUrls = async (url) => {
    const db = await openDatabase();
    const cachedData = await db.get('images', url); // Check if the URL exists in IndexedDB

    if (cachedData) {
        // If the data exists, return the image URLs
        console.log("Image URLs retrieved from cache:", cachedData.imageUrls);
        return cachedData.imageUrls;
    } else {
        // If not found, return null or handle as needed
        console.log("No cached image URLs found for:", url);
        return null;
    }
};