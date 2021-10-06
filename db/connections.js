require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.DB_URL;

mongoose
	.connect(mongoURI)
	.then((res) => console.log(`Connected to DB 🌟`))
	.catch((error) => console.log('Connection failed!', error));

module.exports = mongoose;
