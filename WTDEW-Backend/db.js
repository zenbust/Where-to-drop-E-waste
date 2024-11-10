require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db('Where-To-Drop-E-Waste');
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

async function getCenters() {
    const db = await connectDB();
    const collection = db.collection('centers');
    return await collection.find({}).toArray();
}

async function getCenterById(id) {
    const db = await connectDB();
    const center = await db.collection('centers').findOne({ _id: new ObjectId(id) });
    return center;
}

async function closeDB() {
    await client.close();
    console.log("MongoDB connection closed");
}

module.exports = {
    connectDB,
    getCenters,
    getCenterById,
    closeDB,
};
