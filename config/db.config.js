// config/db.js
// Connect to MongoDB database
const mongoose = require("mongoose");

const db = process.env.DATABASE_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("MongoDB is connected");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
	mongoose.connection.on("disconnected", () => {
		console.log("Mongodb connection disconnected");
	});
};

module.exports = connectDB;
