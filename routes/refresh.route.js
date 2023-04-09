const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refresh.controller");

router.post("/", refreshController.refreshAccessToken);

module.exports = router;
