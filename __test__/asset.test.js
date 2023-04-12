require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const request = require("supertest");
const path = require("path");
const img1Url = path.join(__dirname, "..", "img", "house_1.png");
const img2Url = path.join(__dirname, "..", "img", "house_2.png");

const createServer = require("../config/server");
const Asset = require("../models/Asset");

const app = createServer();

describe("Users", () => {
	let access_token1, access_token2, id1, id2;
	let email1 = "testAsset1@email.com";
	let email2 = "testAsset2@email.com";

	let password = "test";

	beforeAll(async () => {
		const connection = await mongoose.connect(globalThis.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (!connection) {
			console.log("we can't connect to the database");
		}
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	it("should create a new agent 1 and send statuscode 201", async () => {
		const res = await request(app).post("/signin/agent").send({
			email: email1,
			password: password,
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body.success).toEqual(
			`New agent with email: ${email1} created!`
		);

		let user = await User.findOne({ email: email1 }).exec();

		expect(user.email).toEqual(email1);
		expect(user.user_type).toEqual("agent");
		id1 = user._id;
	});

	it("should create a new agent 2 and send statuscode 201", async () => {
		const res = await request(app).post("/signin/candidate").send({
			email: email2,
			password: password,
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body.success).toEqual(
			`New candidate with email: ${email2} created!`
		);

		let user = await User.findOne({ email: email2 }).exec();

		expect(user.email).toEqual(email2);
		expect(user.user_type).toEqual("candidate");
		id2 = user._id;
	});

	it("should create a new asset and send statuscode 201", async () => {
		let res = await request(app).post("/auth").send({
			email: email1,
			password: password,
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body.accessToken).toBeDefined();
		access_token1 = res.body.accessToken;

		res = await request(app)
			.post("/asset")
			.set("Content-Type", "multipart/form-data")
			.set("Authorization", `Bearer ${access_token1}`)
			.field("title", "A asset")
			.field("address", "154 rue du test")
			.field("number_of_rooms", 3)
			.attach("asset_photos", img1Url)
			.attach("asset_photos", img2Url);

		expect(res.statusCode).toEqual(201);

		const id = res.body._id;
		let asset = await Asset.findById(id).exec();

		expect(asset.number_of_rooms).toEqual(3);
		expect(asset.images.length).toEqual(2);
	});
});
