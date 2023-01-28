// controllers/plants.js
/* Methods for endpoints to connect with the database */

// import plants model
const Plants = require("../models/plants");

// return all plant collection
exports.getAllPlants = (req, res) => {
	Plants.find()
		.then((plants) => res.json(plants))
		.catch((err) =>
			res.status(404).json({ message: "plants not found", error: err.message })
		);
};

// create new plant
exports.addPlant = (req, res) => {
	Plants.create(req.body)
		.then((data) => res.json({ message: "plants added successfully", data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: "Failed to add plants", error: err.message })
		);
};

exports.updatePlant = (req, res) => {
	Plants.findByIdAndUpdate(req.params.id, req.body)
		.then((data) => res.json({ message: "updated successfully", data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: "Failed to update plants", error: err.message })
		);
};

exports.deletePlant = (req, res) => {
	Plants.findByIdAndRemove(req.params.id, req.body)
		.then((data) => res.json({ message: "plant deleted successfully", data }))
		.catch((err) =>
			res.status(404).json({ message: "plant not found", error: err.message })
		);
};
