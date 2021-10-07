const mongoose = require('../db/connections');

const ItemSchema = new mongoose.Schema({
	title: String,
	description: String,
	image: String,
	zip: Number,
	owner: {
		type: mongoose.Schema.Types.ObjectID,
		ref: 'User',
		// required: true,
	},
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
