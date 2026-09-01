const mongoose = require("mongoose");
const schema = mongoose.Schema;

const studentSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	currentCollege: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("students", studentSchema);
