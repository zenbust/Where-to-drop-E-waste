require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
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

async function getStations() {
    const db = client.db('Where-To-Drop-E-Waste');
    const collection = db.collection('Center');
    return await collection.find({}).toArray();
}

async function closeDB() {
    await client.close();
    console.log("MongoDB connection closed");
}

module.exports = {
    connectDB,
    getStations,
    closeDB,
};
