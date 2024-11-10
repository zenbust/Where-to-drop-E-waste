module.exports = (req, res) => {
    const message = req.body.message;
    console.log("Client log:", message);
    res.sendStatus(200);
};
