require("dotenv").config();
const express = require("express");
const handleJWT = require("../middlewares/handleJWT");

const createServer = () => {
	// init the express server
	const server = express();

	// built-in middleware to handle urlencoded data, form data:
	server.use(express.urlencoded({ extended: false }));

	// built-in middleware for json
	server.use(express.json());

	//public routes
	server.use("/signin", require("../routes/signin.route"));
	server.use("/auth", require("../routes/auth.route"));
	server.use("/refresh", require("./routes/refresh"));

	// middleware for verify the information in the JWT access token and put the data in the request object
	server.use(handleJWT);

	return server;
};

module.exports = createServer;
