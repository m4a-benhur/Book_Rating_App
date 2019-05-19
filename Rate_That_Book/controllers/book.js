const BookSchema = require('../models/Book.js');
var Book = require("../models/Book");
const Rating = require("../models/Rating");
const passport = require('passport');

module.exports.controller = (app) => {

// fetch all books
  app.get('/books', (req, res) => {
    BookSchema.find({}, 'name description release_year genre',(error, books) =>
    {
      if (error) { console.log(error); }
      res.send({
        books: books
      });
    });
  });
// fetch a single book
  app.get('books/:id', (req, res) => {
    BookSchema.findById(req.params.id, 'name description release_year genre', (error, books) => {
      if (error) { console.error(error); }
        res.send(book);
      });
  })


  // rate a book
  app.post('/books/rate/:id', (req, res) => {
    const rating = new Rating({
      book_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate,
    })
    rating.save(function (error, rating) {
      if (error) { console.log(error); }
      res.send({
        book_id: rating.book_id,
        user_id: rating.user_id,
        rate: rating.rate
      })
    })
  })
// add a new book
  app.post('/books', (req, res) => {
    const book = new Book({
    name: req.body.name,
    description: req.body.description,
    release_year: req.body.release_year,
    genre: req.body.genre,
  });

    book.save((error, book) => {
      if (error) {
        console.log(error);
      } res.send(book);
    });
  });
};