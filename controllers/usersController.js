const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.post('/users', async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
});

router.patch('/users/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await User.findByIdAndUpdate(id, { new: true });
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await User.findByIdAndDelete(id);
		res.status(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
