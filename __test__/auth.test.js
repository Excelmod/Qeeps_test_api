require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const request = require("supertest");

const createServer = require("../config/server");

const app = createServer();

describe("Authentification", () => {
	let access_token;
	let email = "test1@email.com";
	let password = "test";
	let invalidEmail = "invalidtest@email.com";
	let invalidPwd = "invalidtest@email.com";

	beforeAll(async () => {
		const connection = await mongoose.connect(globalThis.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (!connection) {
			console.log("we can't connect to the database");
		}
		console.log("access_token : ", process.env.ACCESS_TOKEN_SECRET);
		console.log("access_token : ", process.env.ACCESS_TOKEN_SECRET);
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	it("should create a new agent and send statuscode 201", async () => {
		const res = await request(app).post("/signin/agent").send({
			email: email,
			password: password,
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body.success).toEqual(
			`New agent with email: ${email} created!`
		);

		let user = await User.findOne({ email: email }).exec();

		expect(user.email).toEqual(email);
		expect(user.user_type).toEqual("agent");
	});

	it("should login the user create a new refresh token and return access token", async () => {
		const res = await request(app).post("/auth").send({
			email: email,
			password: password,
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body.accessToken).toBeDefined();
		access_token = res.body.accessToken;
		console.log("access_token : ", access_token);
	});

	it("should't login the user with invalid email and send statuscode 401 Unauthorize ", async () => {
		const res = await request(app).post("/auth").send({
			email: invalidEmail,
			password: password,
		});
		expect(res.statusCode).toEqual(401);
	});

	it("should't login the user with invalid password and send statuscode 401 Unauthorize ", async () => {
		const res = await request(app).post("/auth").send({
			email: email,
			password: invalidPwd,
		});
		expect(res.statusCode).toEqual(401);
	});

	it("should login the user create a new refresh token and return access token", async () => {
		let res = await request(app).post("/auth").send({
			email: email,
			password: password,
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body.accessToken).toBeDefined();
		access_token = res.body.accessToken;
		console.log("access_token : ", access_token);
		console.log("pre test");
		res = await request(app)
			.get("/user/me")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.email).toEqual(email);
	});

	it("shouldn't login the user with invalid access_token and return 403", async () => {
		let res = await request(app).post("/auth").send({
			email: email,
			password: password,
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body.accessToken).toBeDefined();
		access_token = res.body.accessToken;
		console.log("access_token : ", access_token);
		console.log("pre test");
		res = await request(app)
			.get("/user/me")
			.set("Authorization", `Bearer fdsfds`);
		expect(res.statusCode).toEqual(403);
	});

	it("shouldn't login the user with invalid access_token and return 403", async () => {
		let res = await request(app).post("/auth").send({
			email: email,
			password: password,
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body.accessToken).toBeDefined();
		access_token = res.body.accessToken;
		console.log("access_token : ", access_token);
		console.log("pre test");
		res = await request(app)
			.get("/user/me")
			.set("Authorization", `Bearer fdsfds`);
		expect(res.statusCode).toEqual(403);
	});
});
