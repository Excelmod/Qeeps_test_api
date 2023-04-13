require("dotenv").config();
const mongoose = require("mongoose");
const createServer = require("./config/server");
const connectMongoDB = require("./config/connectMongoDB");
const port = process.env.PORT || 3200;

// try to connect to the database
connectMongoDB();

// create the express server, 
const app = createServer();


// the server start to listening only if a connection with the mongoDb start
mongoose.connection.once("open", () => {
	app.listen(port, () => console.log(`Server listening on port ${port}`));
});
