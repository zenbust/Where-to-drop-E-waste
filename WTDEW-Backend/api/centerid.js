const { getCenterById } = require('../db');

module.exports = async (req, res) => {
    const centerId = req.query.id;
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
