const { getCenterById } = require('../db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const centerId = req.query.id;
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
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
};
