const express = require("express");
const router = express.Router();
const verifyUserType = require("../../middlewares/verifyUserType");
const assetsController = require("../../controllers/asset.controller");
const upload = require("../../config/imageUpload")();

router
	.route("/")
	.get(assetsController.getAllAssets)
	.post(
		verifyUserType("agent"),
		upload.array("asset_photos", 5),
		assetsController.createNewAsset
	);

router.get(
	"/myApplieds",
	verifyUserType("candidate"),
	assetsController.getMyAssets
);

router.put(
	"/apply/:id",
	verifyUserType("candidate"),
	assetsController.applyToAssetId
);

router.get("/myAssets", verifyUserType("agent"), assetsController.getMyAssets);

router
	.route("/:id")
	.get(assetsController.getAssetById)
	.delete(verifyUserType("agent"), assetsController.deleteAssetById)
	.put(verifyUserType("agent"), assetsController.modifyAssetById);

module.exports = router;
