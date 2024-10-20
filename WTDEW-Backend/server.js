const express = require('express');
const { connectDB, getCenters } = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

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
        const db = client.db('Where-To-Drop-E-Waste');
        const collection = db.collection('centers');

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
