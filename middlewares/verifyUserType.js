const verifyUserType = (...allowedUserTypes) => {
	return (req, res, next) => {
		if (!req?.user_type) return res.sendStatus(401);
		for (userType in [...allowedUserTypes]) {
			if (req?.user_type === userType) {
				next();
			}
		}
		return res.sendStatus(401);
	};
};

module.exports = verifyUserType;
