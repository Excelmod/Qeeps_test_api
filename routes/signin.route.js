const express = require("express");
const router = express.Router();
const signinController = require("../controllers/signin.controller");

router.post("/candidate", signinController.createNewCandidate);
router.post("/agent", signinController.createNewAgent);

module.exports = router;
