const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const awesomeFunction = (req, res) => {
	res.send("Hello World!");
};

const tooeleTech = (req, res) => {
	res.send("Tooele Tech is Awesome!");
};

const getAllStudents = async (req, res, next) => {
	try {
		const result = await mongodb
			.getDB("studentAPI")
			.db("studentAPI")
			.collection("studentAPI")
			.find();
		result.toArray().then((lists) => {
			res.setHeader("Content-Type", "applications/json");
			res.status(200).json(lists);
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

const getSingleStudent = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDB("studentAPI")
			.db("studentAPI")
			.collection("studentAPI")
			.find({ _id: userId });
		result.toArray().then((lists) => {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(lists[0]);
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

const createStudent = async (req, res) => {
	try {
		const student = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			age: req.body.age,
			currentCollege: req.body.currentCollege,
		};

		const response = await mongodb
			.getDB("studentAPI")
			.db("studentAPI")
			.collection("studentAPI")
			.insertOne(student);
		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res
				.status(500)
				.json(
					response.error || "Some error occurred while creating the student.",
				);
		}
	} catch {
		res.status(500).json(error);
	}
};

const updateStudent = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const student = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			age: req.body.age,
			currentCollege: req.body.currentCollege,
		};

		const response = await mongodb
			.getDB("studentAPI")
			.db("studentAPI")
			.collection("studentAPI")
			.replaceOne({ _id: userId }, student);
		if (response.acknowledged) {
			res.status(204).json(response);
		} else {
			res
				.status(500)
				.json(
					response.error || "Some error occurred while updating the student.",
				);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

const deleteStudent = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const response = await mongodb
			.getDB("studentAPI")
			.db("studentAPI")
			.collection("studentAPI")
			.deleteOne({ _id: userId }, true);
		console.log(response);
		if (response.acknowledged) {
			res.status(200).send(response);
		} else {
			res
				.status(500)
				.json(
					response.error || "Some error occurred while deleting the student.",
				);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = {
	awesomeFunction,
	tooeleTech,
	getAllStudents,
	getSingleStudent,
	createStudent,
	updateStudent,
	deleteStudent,
};
