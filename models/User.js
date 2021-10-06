const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: {
		type: String,
		required: true,
	},
	items: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item',
	},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
