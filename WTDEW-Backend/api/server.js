const express = require('express');
const { ObjectId } = require('mongodb');
const { connectDB, getCenters, getCenterById } = require('./db');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

app.get('/api/centers', async (req, res) => {
    try {
        const centers = await getCenters();
        res.json(centers);
    } catch (err) {
        console.error("Error fetching centers:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.get('/api/centers/:id', async (req, res) => {
    const centerId = req.params.id;
    try {
        const center = await getCenterById(centerId);
        if (!center) {
            return res.status(404).json({ error: "Center not found" });
        }
        res.json(center);
    } catch (err) {
        console.error("Error fetching center:", err);
        res.status(500).json({ error: "Failed to fetch center data" });
    }
});

app.post('/api/log', (req, res) => {
    const message = req.body.message;
    console.log("Client log:", message);
    res.sendStatus(200);
});

module.exports = app;
