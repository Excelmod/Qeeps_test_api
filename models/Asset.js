const mongoose = require("mongoose");
const ImageSchema = require("./schemas/ImageSchema");
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
	// id attribute is not required mongoose schema add a unique _id attribute by default
	title: { type: String, required: true },
	address: { type: String, required: true },
	number_of_rooms: {
		type: Number,
		min: [0, "The numbers of rooms have to be positive"],
		required: true,
	},
	images: [ImageSchema],
	created_by: Schema.Types.ObjectId,
});

module.exports = mongoose.model("Asset", AssetSchema);
