const Asset = require("../models/Asset");
const User = require("../models/User");

const createNewAsset = async (req, res) => {
	const { title, address, number_of_rooms } = req?.body;
	if (!title || !number_of_rooms || !address)
		return res.status(400).json({
			// Invalid
			message:
				"title, address, number_of_rooms attributes are required for this request.",
		});
	const newAsset = {
		title: title,
		address: address,
		number_of_rooms: number_of_rooms,
		created_by: req.id,
		images: [],
	};
	for (let i in req?.files) {
		const image = {
			mime_type: req.files[i].mimetype,
			data: req.files[i].buffer,
		};
		newAsset.images.push(image);
	}
	try {
		const result = await Asset.create(newAsset);
		return res.status(201).json({
			success: `New Asset  ${title} created!`,
		});
	} catch (err) {
		console.error(err.message);
		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({ message: err.message }); // Invalid
		} else {
			return res.status(500).json({ message: err.message });
		}
	}
};

const getAllAssets = async (req, res) => {
	const assets = await Asset.find({});
	if (!assets) return res.status(204).json({ message: "No asset found." });
	res.json(assets);
};

const getAssetById = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: "ID is required" }); // Invalid
	}
	const foundAsset = await Asset.findOne({ _id: req.params.id }).exec();
	if (!foundAsset) {
		return res
			.status(404)
			.json({ message: `Asset ID ${req.params.id} not found` });
	}
	res.json(foundAsset);
};

const deleteAssetById = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: "ID is required" }); // Invalid
	}
	const foundAsset = await Asset.findOne({ _id: req.params.id }).exec();
	if (!foundAsset) {
		return res
			.status(404) //Not found
			.json({ message: `Asset ID ${req.params.id} not found` });
	}
	if (foundAsset.created_by !== req.id) {
		return res
			.status(403) //Forbidden
			.json({ message: `this user cannot delete this asset` });
	}
	const result = await Asset.deleteOne({ _id: req.body.id });
	res.json(result);
};

const applyToAssetId = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: "ID is required" }); // Invalid
	}
	const foundAsset = await Asset.exists({ _id: req.params.id });
	if (!foundAsset) {
		return res
			.status(404) //Not found
			.json({ message: `Asset ID ${req.params.id} not found` });
	}
	const foundUser = await User.findById(req.id).exec();
	if (!foundUser.assets.includes(req.params.id)) {
		foundUser.assets.push(req.params.id);
		await foundEmployee.save();
		res.status(200).send({
			message: `Succesfully apply to asset ID ${req.params.id}`,
		});
	} else {
		res.status(200).send({
			message: `Already apply to asset ID ${req.params.id}`,
		});
	}
};

const getMyAssets = async (req, res) => {
	const foundUser = await User.findById(req.id).exec();
	const assets = await Asset.find({ _id: { $in: foundUser.assets } });
	if (!assets) return res.status(204).json({ message: "No asset found." });
	res.json(assets);
};

module.exports = {
	getAllAssets,
	createNewAsset,
	getAssetById,
	deleteAssetById,
	applyToAssetId,
	getMyAssets,
};
