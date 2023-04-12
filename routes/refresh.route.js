const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refresh.controller");

router.get("/", refreshController.refreshAccessToken);

module.exports = router;
