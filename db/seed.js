const Item = require('../models/Item');
const seedData = require('./items.json');

Item.deleteMany({})
	.then(() => {
		console.log('All items deleted!');
		return Item.insertMany(seedData);
	})
	.then((items) => {
		console.log(items);
		console.log('Items created ✅');
		console.log('Goodbye! 👋');

		process.exit();
	})
	.catch(console.error);
