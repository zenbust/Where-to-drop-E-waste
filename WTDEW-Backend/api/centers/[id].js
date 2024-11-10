const { getCenterById } = require('../../db');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

const handler = async (req, res) => {
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

module.exports = allowCors(handler);
