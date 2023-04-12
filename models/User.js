const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		match: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/,
	},
	password: { type: String, required: true },
	user_type: { type: String, enum: ["candidate", "agent"], required: true },
	refresh_token: { type: String, default: "" },
	assets: { type: [Schema.Types.ObjectId], default: [] },
	agency: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model("User", UserSchema);
