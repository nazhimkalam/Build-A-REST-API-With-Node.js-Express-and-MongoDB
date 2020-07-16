const express = require('express');
const router = express.Router();
const Character = require('../models/character');

// Getting all
router.get('/', async (req, res) => {
	try {
		const character = await Character.find();
		res.json(character);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Getting One
router.get('/:id', getCharacter, (req, res) => {
	res.send(res.character);
});

// Creating One
router.post('/', async (req, res) => {
	const character = new Character({
		name: req.body.name,
		gender: req.body.gender,
		strengths: req.body.strengths,
	});

	try {
		const newCharacter = await character.save();
		res.status(201).json(newCharacter);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Updating One
router.patch('/:id', getCharacter, async (req, res) => {
	if (req.body.name != null) {
		res.character.name = req.body.name;
	}

	if (req.body.gender != null) {
		res.character.gender = req.body.gender;
	}

	if (req.body.strengths != null) {
		res.character.strengths = req.body.strengths;
	}

	try {
		const updatedCharacter = await res.character.save();
		res.json(updatedCharacter);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Deleting One
router.delete('/:id', getCharacter, async (req, res) => {
	try {
		await res.character.remove();
		res.json({ message: 'Deleted Character' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// setting up the middleware
async function getCharacter(req, res, next) {
	let character;
	try {
		character = await Character.findById(req.params.id);
		if (character == null) {
			return res.status(404).json({ message: 'Cannot find Character' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.character = character;
	next();
}

module.exports = router;
