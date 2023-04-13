const express = require("express");
const router = express.Router();
const verifyUserType = require("../../middlewares/verifyUserType");
const assetsController = require("../../controllers/asset.controller");
const upload = require("../../config/imageUpload")();

router.get("/", assetsController.getAllAssets);
// get all assets
// get request
// set Authorization header with the access token as a Bearer token
// On success:
//  200 status code
//  res.body : [Asset]
//
//  204 status code
//  there are no asset found
// Error:
//  403 status code
//  invalid access token.

router.post(
	"/",
	verifyUserType("agent"),
	upload.array("asset_photos", 5),
	assetsController.createNewAsset
);
// Create a new asset.
// post request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// attach optional images
// body parameters :
// - title
// - address
// - number_of_rooms
// On success:
//  res.status 201
//  res.body : Asset

// Error:
//  403 status code
//  invalid access token.
// 	400 status code
// 	body parameters are missing

router.get(
	"/myApplieds",
	verifyUserType("candidate"),
	assetsController.getMyAssets
);
// get all asset applied by the user
// get request
// middleware verifyUserType verify that only candidate can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// On success:
//  200 status code
//  res.body : [Asset]
//
//  204 status code
//  there are no asset found
// Error:
//  403 status code
//  invalid access token.

router.put(
	"/apply/:id",
	verifyUserType("candidate"),
	assetsController.applyToAssetId
);
// apply to the asset with id in url params.
// put request
// middleware verifyUserType verify that only candidate can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// On success:
//  res.status 200
//  res.body : {message: String}

router.get("/myAssets", verifyUserType("agent"), assetsController.getMyAssets);
// get all asset created by the user
// get request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// On success:
//  200 status code
//  res.body : [Asset]
//
//  204 status code
//  there are no asset found
// Error:
//  403 status code
//  invalid access token.

router.get("/:id", assetsController.getAssetById);
// get the asset with a specific id.
// get request
// set Authorization header with the access token as a Bearer token
// On success:
//  res.status 200
//  res.body : Asset
//
// Error:
//  403 status code
//  invalid access token.
//  404 status code
//  asset not found.
// 	400 status code
// 	url parameters are missing

router.delete(
	"/:id",
	verifyUserType("agent"),
	assetsController.deleteAssetById
);
// delete the asset with a specific id only if the user is its creator.
// delete request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// On success:
//  res.status 200
//  res.body : {message: String}
//
// Error:
//  403 status code
//  invalid access token or the user is not the creator of this asset.
//  404 status code
//  asset not found.
// 	400 status code
// 	url parameters are missing

router.put("/:id", verifyUserType("agent"), assetsController.modifyAssetById);
// modify the asset with a specific id only if the user is its creator.
// put request
// middleware verifyUserType verify that only agent can perform this request return status 401 otherwise
// set Authorization header with the access token as a Bearer token
// attach multiple optional images
// body parameters :
// - title (optional)
// - address (optional)
// - number_of_rooms (optional)
// On success:
//  res.status 200
//  res.body : Asset
//
// Error:
//  403 status code
//  invalid access token or the user is not the creator of this agency.
//  404 status code
//  asset not found.
// 	400 status code
// 	url parameters are missing

module.exports = router;
