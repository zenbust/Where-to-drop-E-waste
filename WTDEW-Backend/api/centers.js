const { getCenters } = require('../db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://where-to-drop-e-waste.vercel.app');
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }
    try {
        const centers = await getCenters();
        res.json(centers);
    } catch (err) {
        console.error("Error fetching centers:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

