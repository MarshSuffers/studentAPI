const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllColors = async (req, res, next) => {
	try {
		const result = await mongodb
			.getDB("colors")
			.db("colors")
			.collection("colors")
			.find();
		result.toArray().then((lists) => {
			res.setHeader("Content-Type", "applications/json");
			res.status(200).json(lists);
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

const getSingleColor = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDB("colors")
			.db("colors")
			.collection("colors")
			.find({ _id: userId });
		result.toArray().then((lists) => {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(lists[0]);
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

const createColor = async (req, res) => {
	try {
		const color = {
			hexCode: req.body.hexCode,
			name: req.body.name,
		};

		const response = await mongodb
			.getDB("colors")
			.db("colors")
			.collection("colors")
			.insertOne(color);
		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res
				.status(500)
				.json(
					response.error || "Some error occurred while creating the color.",
				);
		}
	} catch {
		res.status(500).json(error);
	}
};

const updateColor = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const color = { name: req.body.name, hexCode: req.body.hexCode };
		const response = await mongodb
			.getDB("colors")
			.db("colors")
			.collection("colors")
			.updateOne({ _id: userId }, { $set: color });
		if (response.matchedCount === 0) {
			return res.status(404).json({ message: "Color not found." });
		}
		res
			.status(200)
			.json({ message: "Color updated successfully.", color: color });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Some error occurred while updating the color.",
			error: error.message,
		});
	}
};

const deleteColor = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const response = await mongodb
			.getDB("colors")
			.db("colors")
			.collection("colors")
			.deleteOne({ _id: userId }, true);
		console.log(response);
		if (response.acknowledged) {
			res.status(200).send(response);
		} else {
			res
				.status(500)
				.json(
					response.error || "Some error occurred while deleting the color.",
				);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = {
	getAllColors,
	getSingleColor,
	createColor,
	updateColor,
	deleteColor,
};
