const express = require("express");
const router = express.Router();
const signinController = require("../controllers/signin.controller");

router.post("/", authController.authUser);

module.exports = router;
