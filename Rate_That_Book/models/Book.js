const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
	name: String,
	description: String,
	release_year: Number,
	genre: String,
});
const Book = mongoose.model('Book', BookSchema)
module.exports = Book;