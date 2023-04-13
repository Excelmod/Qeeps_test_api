const express = require("express");
const router = express.Router();
const signinController = require("../controllers/signin.controller");

router.post("/candidate", signinController.createNewCandidate);
// Create a new candidate
// post request
// body parameters :
// - email
// - password
// On success:
//  status 201
// if the email have a invalid standard format return a 400 status code

router.post("/agent", signinController.createNewAgent);
// Create a new agent
// post request
// body parameters :
// - email
// - password
// On success:
//  status 201
// if the email have a invalid standard format return a 400 status code

module.exports = router;
