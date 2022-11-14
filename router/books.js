const express = require('express');
const { getBooks, detailBook, deleteBook, updateBook, addBook } = require('../controller/books.controller');
const { auth } = require('../controller/user.controller');


const routerBook = express.Router();
routerBook.get('/get-books',getBooks)
routerBook.get('/detail-book/:_id',auth,detailBook)
routerBook.delete('/delete-book/:_id',auth,deleteBook)
routerBook.put('/update-book/:_id',auth,updateBook)
routerBook.post('/add-book',auth,addBook)
module.exports = routerBook;
