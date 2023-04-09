const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authUser = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res
			.status(400)
			.json({ message: "Email and password are required." });

	const foundUser = User.findOne({ email: email }).exec();
	if (!foundUser) return res.sendStatus(401);
	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const accessToken = jwt.sign(
			{
				UserInfo: {
					id: foundUser._id,
					email: foundUser.email,
					user_type: foundUser.user_type,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "2m" }
		);
		const refreshToken = jwt.sign(
			{ id: foundUser._id },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		console.log(result);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			sameSite: "None",
			//secure: true, should be set in production
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
};

module.exports = { authUser };
