require("dotenv").config();
const express = require("express");
const handleJWT = require("../middlewares/handleJWT");
const credentials = require("../middlewares/credentials");
const cors = require("cors");
const { corsConfig } = require("./corsConfig");
const cookieParser = require("cookie-parser");

const createServer = () => {
	// init the express server
	const server = express();

	// Handle options credentials check and fetch cookies credentials requirement
	server.use(credentials);

	// Handle Cors middleware
	server.use(cors(corsConfig));

	// middleware to handle urlencoded data, form data:
	server.use(express.urlencoded({ extended: false }));

	// middleware for json
	server.use(express.json());

	// middleware for parse the cookie attach to the request
	server.use(cookieParser());

	//public routes
	server.use("/signin", require("../routes/signin.route"));
	server.use("/auth", require("../routes/auth.route"));
	server.use("/refresh", require("../routes/refresh.route"));
	server.use("/logout", require("../routes/logout.route"));

	// middleware for verify the information in the JWT access token, authenticate the user and put the data in the request object
	server.use(handleJWT);
	//protected routes
	server.use("/user", require("../routes/api/user.route"));
	server.use("/asset", require("../routes/api/asset.route"));
	server.use("/agency", require("../routes/api/agency.route"));

	return server;
};

module.exports = createServer;
