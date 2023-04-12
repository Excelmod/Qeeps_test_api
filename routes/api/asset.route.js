const express = require("express");
const router = express.Router();
const verifyUserType = require("../../middlewares/verifyUserType");
const assetsController = require("../../controllers/asset.controller");
const upload = require("../../config/imageUpload");

router
	.route("/")
	.get(assetsController.getAllAssets)
	.post(
		verifyUserType(
			"agent",
			upload.array("asset_photos", 15),
			assetsController.createNewAsset
		)
	);

router.get(
	"/myApplieds",
	verifyUserType("candidate"),
	assetsController.getMyapplieds
);

router.get("/myAssets", verifyUserType("agent"), assetsController.getMyAssets);

router
	.route("/:id")
	.get(assetsController.getAssetById)
	.delete(verifyUserType("agent"), assetsController.deleteAssetbyId);

module.exports = router;
