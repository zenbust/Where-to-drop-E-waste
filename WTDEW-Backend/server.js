const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}
connectDB();

app.get('/centers', async (req, res) => {
    try {
        const centers = await getCenters();
        res.json(centers);
    } catch (err) {
        console.error("Error fetching centers:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.get('/centers/search', async (req, res) => {
    const query = req.query.q;
    try {
        const centers = await collection.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } }
            ]
        }).toArray();

        res.json(centers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to search" });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
