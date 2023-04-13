const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/", authController.authUser);
// Authenticate a user, create a access token and a refresh token.
// return the access token in the response and the refresh token in a cookie attach to the
// post request
// body parameters :
// - email
// - password
// On success:
//  res.status 200
//  res.body :{accessToken}
//  res.cookie : {jwt: refresh_token}
// Error:
// 401 status code
// the user with this email and password is not in the database.
// 400 status code
// body parameters are missing

module.exports = router;
