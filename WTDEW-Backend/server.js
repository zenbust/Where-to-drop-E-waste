const express = require('express');
const { ObjectId } = require('mongodb');
const { connectDB, getCenters, getCenterById } = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Connect to the database
connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

// Route to get all centers
app.get('/centers', async (req, res) => {
    try {
        const centers = await getCenters(); // Fetch all centers from the database
        res.json(centers); // Send the data back to the client
    } catch (err) {
        console.error("Error fetching centers:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Route to get center by ID
app.get('/centers/:id', async (req, res) => {
    const centerId = req.params.id;
    try {
        const center = await getCenterById(centerId); // Retrieves center by MongoDB ID
        if (!center) {
            return res.status(404).json({ error: "Center not found" });
        }
        res.json(center);
    } catch (err) {
        console.error("Error fetching center:", err);
        res.status(500).json({ error: "Failed to fetch center data" });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
