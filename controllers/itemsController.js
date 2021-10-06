const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res, next) => {
	try {
		const item = await Item.find();
		res.status(200).json(item);
	} catch (error) {
		next(error);
	}
});

router.get('/items/:id', async (req, res, next) => {
	try {
		const item = await Item.findById(req.params.id);
	} catch (error) {
		next(error);
	}
});

router.post('/items', async (req, res, next) => {
	try {
		const newItem = await Item.create(req.body);
		res.status(201).json(newItem);
	} catch (error) {
		next(error);
	}
});

router.patch('/items/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const item = await Item.findByIdAndUpdate(id, { new: true });
	} catch (error) {
		next(error);
	}
});

router.delete('/items/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const deleted = await Item.findByIdAndDelete(id);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
