require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const connectMongoDB = require('./config/connectMongoDB');

// try to connect to the database
connectMongoDB();

// built-in middleware to handle urlencoded data, form data:
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

mongoose.connection.once('open', () => {
	app.listen(port, () => console.log(`Server listening on port ${port}`));
});
