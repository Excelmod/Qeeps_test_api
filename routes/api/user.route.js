const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.get("/", userController.getAllUsers);
// get all users
// get request
// set Authorization header with the access token as a Bearer token
// On success:
//  200 status code
//  res.body : [User] the sensitive data and assets are removed from users
//
//  204 status code
//  there are no users found
// Error:
//  403 status code
//  invalid access token.

router.get("/me", userController.getMyProfile);
// get my info user
// get request
// set Authorization header with the access token as a Bearer token
// On success:
//  200 status code
//  res.body : User    ,the sensitive data are removed from users
// Error:
//  403 status code
//  invalid access token.

router.get("/:id", userController.getUserById);
// get a user by a id
// get request
// set Authorization header with the access token as a Bearer token
// On success:
//  200 status code
//  res.body : User the sensitive data and assets are removed from users
//
//  204 status code
//  the user not found
// Error:
//  403 status code
//  invalid access token.

module.exports = router;
