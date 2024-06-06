const express = require("express")
const Router = express.Router()
const BooksController = require("./controller")
const container = require("../../../../Infrastructures/container")

const booksController = new BooksController(container)

Router.post('/borrow', booksController.postBorrow)
Router.get('/', booksController.getBooks)
Router.delete('/return', booksController.delBookReturn)

module.exports = Router