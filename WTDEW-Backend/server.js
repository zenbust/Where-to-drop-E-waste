const express = require('express');
const { connectDB, getCenters } = require('./db'); // Ensure you have a function to fetch centers
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

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
