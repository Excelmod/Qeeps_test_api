const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = require('./schemas/ImageSchema');

const AgencySchema = new Schema({
	// id attribute is not required mongoose schema add a unique _id attribute by default
	name: { type: String, required: true },
	logo: ImageSchema,
});

module.exports = mongoose.model('Agency', AgencySchema);
