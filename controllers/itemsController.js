const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

const { requireToken } = require('../middleware/auth');

// GET request for all items and populate owner field
router.get('/', async (req, res, next) => {
	try {
		const item = await Item.find().populate({
			path: 'owner',
			select: 'username email',
		});
		res.status(200).json(item);
	} catch (error) {
		next(error);
	}
});

// GET items owned by specific user
router.get('/user/:id', async (req, res, next) => {
	try {
		const items = await Item.find({ owner: { _id: req.params.id } });
		res.json(items);
	} catch (error) {
		next(error);
	}
});

// GET item by ID
router.get('/:id', async (req, res, next) => {
	try {
		const item = await Item.findById(req.params.id);
		res.json(item);
	} catch (error) {
		next(error);
	}
});

// POST to create new item
router.post('/', async (req, res, next) => {
	try {
		const newItem = await Item.create(req.body);
		res.status(201).json(newItem);
	} catch (error) {
		next(error);
	}
});

// PUT to update item info
router.put('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const item = await Item.findByIdAndUpdate(id, req.body, { new: true });
		res.status(200).json(item);
	} catch (error) {
		next(error);
	}
});

// DELETE item
router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const deleted = await Item.findByIdAndDelete({ _id: id });
		res.json(deleted);
	} catch (error) {
		next(error);
	}
});

router.delete('/user/:id', async (req, res, next) => {
	try {
		const items = await Item.find({ owner: { _id: req.params.id } });
		res.json(items);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
