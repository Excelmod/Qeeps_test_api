const express = require("express");
const router = express.Router();
const verifyUserType = require("../../middlewares/verifyUserType");
const agencyController = require("../../controllers/agency.controller");
const upload = require("../../config/imageUpload")();

router.get("/", agencyController.getAllAgencies);
// get all agencies
// get request
// set Authorization header with the access token as a Bearer token
// On success:
//  200 status code
//  res.body : [Agency]
//
//  204 status code
//  there are no agency found
// Error:
//  403 status code
//  invalid access token.

router.post(
	"/",
	verifyUserType("agent"),
	upload.single("logo"),
	agencyController.createNewAgency
);

// Create a new agency.
// post request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// attach a optional single image
// body parameters :
// - name
// On success:
//  res.status 201
//  res.body : Agency

// Error:
//  403 status code
//  invalid access token.
// 	400 status code
// 	body parameters are missing

router.post(
	"/register/:id",
	verifyUserType("agent"),
	agencyController.registerToAgencyId
);
// register to the agency with id in url params.
// post request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// On success:
//  res.status 200
//  res.body : {message: String}

// Error:
//  403 status code
//  invalid access token.
//  404 status code
//  agency not found.
// 	400 status code
// 	url parameters are missing

router.get("/my", verifyUserType("agent"), agencyController.getMyAgency);
// get the agency of the user.
// get request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// On success:
//  res.status 200
//  res.body : Agency

// Error:
//  403 status code
//  invalid access token.
//  404 status code
//  agency not found.

router.get("/:id", agencyController.getAgencyById);
// get the agency with a specific id.
// get request

// set Authorization header with the access token as a Bearer token
// On success:
//  res.status 200
//  res.body : Agency

// Error:
//  403 status code
//  invalid access token.
//  404 status code
//  agency not found.
// 	400 status code
// 	url parameters are missing

router.delete(
	"/:id",
	verifyUserType("agent"),
	agencyController.deleteAgencyById
);
// delete the agency with a specific id only if the user is its creator.
// delete request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// On success:
//  res.status 200
//  res.body : {message: String}
//
// Error:
//  403 status code
//  invalid access token or the user is not the creator of this agency.
//  404 status code
//  agency not found.
// 	400 status code
// 	url parameters are missing

router.put("/:id", verifyUserType("agent"), agencyController.modifyAgencyById);
// modify the agency with a specific id only if the user is its creator.
// put request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// attach a optional single image
// body parameters :
// - name (optional)
// On success:
//  res.status 200
//  res.body : Agency
//
// Error:
//  403 status code
//  invalid access token or the user is not the creator of this agency.
//  404 status code
//  agency not found.
// 	400 status code
// 	url parameters are missing

module.exports = router;
