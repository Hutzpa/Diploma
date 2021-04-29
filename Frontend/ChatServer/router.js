const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Serv is up");
});

module.exports = router;
