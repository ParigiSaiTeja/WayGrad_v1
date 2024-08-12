import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables from .env file
dotenv.config();

// Connection URI and database details from environment variables
const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

const databaseName = process.env.MONGODB_DB_NAME || 'test'; // Set your database name
const collectionName = process.env.MONGODB_COLLECTION_NAME || 'whatsappsublets'; // Set your collection name

export async function getMessages(params: { category: any; }) {
    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected correctly to server");

        // Get the database and collection
        const db = client.db(databaseName);
        const collection = db.collection(collectionName);

        // Query the collection based on params
        let query = {};
        if (params.category) {
            query = { 'categories': params.category };
        }

        // Retrieve items from the collection
        const itemsCursor = collection.find(query);
        const items = await itemsCursor.toArray();

        // Log the fetched items for debugging
        console.log('Fetched items:', items);

        return items;
    } catch (error) {
        console.error("Error fetching items from MongoDB:", error);
        return [];
    } finally {
        // Close the MongoDB client
        await client.close();
    }
}
