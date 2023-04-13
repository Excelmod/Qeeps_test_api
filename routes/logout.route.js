const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logout.controller");

router.get("/", logoutController.handleLogout);
// logout a user, delete the refresh token.
// the client should delete the access token
// get request
// On success:
//  res.status 204

module.exports = router;
