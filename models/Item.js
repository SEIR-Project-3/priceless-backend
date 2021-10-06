const mongoose = require('./db/connection');

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    zip: Number   
});

const Item = mongoose.model(em', ')
module.exports = Item;
