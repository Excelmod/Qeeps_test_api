const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgencySchema = new Schema({
	// id attribute is not required mongoose schema add a unique _id attribute by default
	name: { type: String, required: true },
	logo:
});

module.exports = mongoose.model('Agency', AgencySchema);

