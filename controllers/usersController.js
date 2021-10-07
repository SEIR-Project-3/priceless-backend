const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');


const { createUserToken } = require('../middleware/auth');


// router.get('/', async (req, res, next) => {
// 	try {
// 		const users = await User.find();
// 		res.status(200).json(users);
// 	} catch (error) {
// 		next(error);
// 	}
// });


router.get('/users', async (req, res, next) => {
	try {
		const users = await User.find(req.body);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});


// SIGN UP
router.post('/signup', async (req, res, next) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			user: req.body.username,
			email: req.body.email,
			password
		});
	} catch (error) {
		
	}
});

// SIGN IN
router.post('/signin', async (req, res, next) => {
	try {
		const user = await User.findOne({ user: req.body.username });
		const token = await createUserToken(req, user);
		res.json({ token })
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
