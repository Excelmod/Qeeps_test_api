const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
	// id attribute is not required mongoose schema add a unique _id attribute by default
	title: { type: String, required: true },
	address: { type: String, required: true },
	address: {
		type: Number,
		min: [0, 'The numbers of rooms have to be positive'],
		required: true,
	},
	user_type: { type: String, enum: ['candidate', 'agent'], required: true },
});

module.exports = mongoose.model('Asset', AssetSchema);
