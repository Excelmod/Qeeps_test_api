const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refresh.controller");

router.get("/", refreshController.refreshAccessToken);
// Refresh a access token with a valid refresh token.
// return the access token in the response and the refresh token in a cookie attach to the
// get request
// On success:
//  res.status 200
//  res.body :{accessToken}
// Error:
// 401 status code
// the jwt refresh token is missing in the cookie
// 403 status code
// the jwt refresh token is invalid

module.exports = router;
