const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
	hex: { type: String, required: true },
});

const Hex = mongoose.model("Hex", colorSchema);

module.exports = Hex;
