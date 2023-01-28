// models/plants.js
const mongoose = require("mongoose");

const PlantsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	varieties: [{ name: String, desc: String }],
	water: String,
	sun: String,
	container: {
		width: Number,
		min_weight: String,
	},
	spacing: String,
	imgUrl: String,
});

const Plants = mongoose.model("plants", PlantsSchema);

module.exports = Plants;
