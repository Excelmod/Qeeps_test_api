require('dotenv').config();
const express = require('express');

const createServer = () => {
	const server = express();

	// built-in middleware to handle urlencoded data, form data:
	server.use(express.urlencoded({ extended: false }));

	// built-in middleware for json
	server.use(express.json());

	//routes
	server.use('/signin', require('../routes/signin'));

	return server;
};

module.exports = createServer;
