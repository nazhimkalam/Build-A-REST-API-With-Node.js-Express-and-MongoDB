const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	strengths: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Character', characterSchema);
