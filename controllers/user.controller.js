const User = require("../models/User");

const getAllUsers = async (req, res) => {
	const users = await User.find({});
	if (!users) return res.status(204).json({ message: "No user found." });
	res.json(users);
};

const getUserById = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: "ID is required" }); // Invalid
	}
	const foundUser = await User.findOne({ _id: req.params.id }).exec();
	if (!foundUser) {
		return res
			.status(404)
			.json({ message: `User ID ${req.params.id} not found` });
	}
	res.json(foundUser);
};

const getMyProfile = async (req, res) => {
	console.log("profile");
	if (!req?.id) {
		res.sendStatus(403);
	}
	const foundUser = await User.findById(req.id).exec();
	if (!foundUser) return res.status(400).json({ message: "No user found." });
	res.json(foundUser);
};

module.exports = {
	getMyProfile,
	getAllUsers,
	getUserById,
};
