const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	user_type: { type: String, enum: ['candidate', 'agent'], required: true },
});

module.exports = mongoose.model('User', UserSchema);
