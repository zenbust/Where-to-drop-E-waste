require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env file
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

async function getCenters() { // This function should fetch all centers
    const db = client.db('Where-To-Drop-E-Waste'); // Make sure the DB name matches
    const collection = db.collection('centers'); // Make sure the collection name matches
    return await collection.find({}).toArray();
}

async function closeDB() {
    await client.close();
    console.log("MongoDB connection closed");
}

module.exports = {
    connectDB,
    getCenters,
    closeDB,
};
