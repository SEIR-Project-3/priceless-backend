const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},

		// items: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Item',
		// },
	},
	{
		timestamps: true,
    	toJSON: {
      	virtuals: true,
    	// ret is the returned Mongoose document
    	transform: (_doc, ret) => {
        	delete ret.password;
        	return ret;
      		},
    	},
  	}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
