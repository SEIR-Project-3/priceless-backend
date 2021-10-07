const User = require('../models/User');
const seedUserData = require('./users.json');

User.deleteMany({})
	.then(() => {
		console.log('All items deleted!');
		return User.insertMany(seedUserData);
	})
	.then((items) => {
		console.log(items);
		console.log('Items created ✅');
		console.log('Goodbye! 👋');

		process.exit();
	})
	.catch(console.error);
