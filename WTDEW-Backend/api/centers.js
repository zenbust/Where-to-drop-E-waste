const { getCenters } = require('../db');

module.exports = async (req, res) => {
    try {
        const centers = await getCenters();
        res.json(centers);
    } catch (err) {
        console.error("Error fetching centers:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

