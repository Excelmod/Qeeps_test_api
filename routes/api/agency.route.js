const express = require("express");
const router = express.Router();
const verifyUserType = require("../../middlewares/verifyUserType");
const agencyController = require("../../controllers/agency.controller");
const upload = require("../../config/imageUpload")();

router
	.route("/")
	.get(agencyController.getAllAgencies)
	.post(
		verifyUserType("agent"),
		upload.single("logo"),
		agencyController.createNewAgency
	);

router.post(
	"/register/:id",
	verifyUserType("agent"),
	agencyController.registerToAgencyId
);

router.get("/my", verifyUserType("agent"), agencyController.getMyAgency);

router
	.route("/:id")
	.get(agencyController.getAgencyById)
	.delete(verifyUserType("agent"), agencyController.deleteAgencyById)
	.put(verifyUserType("agent"), agencyController.modifyAgencyById);

module.exports = router;
