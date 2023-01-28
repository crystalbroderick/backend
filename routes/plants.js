// routes/plants.js
const express = require("express");
const router = express.Router();

const {
	addPlant,
	getAllPlants,
	updatePlant,
	deletePlant,
} = require("../controllers/plants");

/**
 * @route POST api/plants
 * @description add a new plant
 * @access public
 */
router.post("/", addPlant);

/**
 * @route GET api/plants
 * @description get all plants
 * @access public
 */
router.get("/", getAllPlants);

/**
 * @route PUT api/plants/:id
 * @description update plant
 * @access public
 */
router.put("/:id", updatePlant);

/**
 * @route DELETE api/plants/:id
 * @description delete plant
 * @access public
 */
router.delete("/:id", deletePlant);

module.exports = router;
