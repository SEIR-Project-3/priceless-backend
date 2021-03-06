const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

const { createUserToken } = require('../middleware/auth');

// GET ALL Users
router.get('/users', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

// GET ONE User
router.get('/user/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

// SIGN UP
router.post('/signup', async (req, res, next) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			password,
		});
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

// SIGN IN
router.post('/signin', async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const token = await createUserToken(req, user);
		res.json({ token, user });
	} catch (error) {
		next(error);
	}
});

// PATCH route to Change password
router.patch('/user/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.findByIdAndUpdate(
			id,
			{ $set: { password: password } },
			{ new: true }
		);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

// DELETE User and ALL items that belong to user
router.delete('/user/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		await Item.deleteMany({ owner: { _id: id } });
		const user = await User.findByIdAndDelete({ _id: id });
		res.json(user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
