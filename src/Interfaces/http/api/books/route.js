const express = require("express")
const Router = express.Router()
const BooksController = require("./controller")
const container = require("../../../../Infrastructures/container")

const booksController = new BooksController(container)

/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       description: array of returned books data
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         code:
 *           type: string
 *           description: The code for the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author name
 *         stock:
 *           type: integer
 *           description: The quantity of book's stock
 *       example:
 *         code: JK-45
 *         title: Harry Potter
 *         author: J.K Rowling
 *         stock: 1
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books endpoint API docs
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books and the sum of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status: 
 *                      type: integer
 *                      description: status code returned
 *                      example: 200
 *                  data:
 *                      type: object
 *                      properties:
 *                          books:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Books'
 *                          quantities:
 *                              type: integer
 *                              description: quantities of all books
 */
Router.get('/', booksController.getBooks)


/**
 * @swagger
 * /books/borrow:
 *   post:
 *     summary: Add borrowed books data and member code
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: string
 *                          description: member code
 *                          example: M001
 *                      books:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Books'
 *     responses:
 *       201:
 *         description: Borrowing book successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status: 
 *                      type: integer
 *                      description: status code returned
 *                      example: 201
 *                  data:
 *                      type: object
 *                      properties:
 *                          borrower:
 *                              type: string
 *                              description: member code
 *                              example: M001
 *                          books:
 *                              type: array
 *                              items:
 *                                type: object
 *                                properties:
 *                                    code_book:
 *                                        type: string
 *                                        description: code of the book
 *                                        example: JK-45
 */
Router.post('/borrow', booksController.postBorrow)

/**
 * @swagger
 * /books/return:
 *   delete:
 *     summary: Delete borrowed books data and member code
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: string
 *                          description: member code
 *                          example: M001
 *                      books:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: string
 *                                      description: The code for the book
 *                                      example: JK-45
 *                                  title:
 *                                      type: string
 *                                      description: The title of the book
 *                                      example: Harry Potter
 *                                  author:
 *                                      type: string
 *                                      description: The author name
 *                                      example: J.K Rowling
 *     responses:
 *       200:
 *         description: Returning book successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status: 
 *                      type: integer
 *                      description: status code returned
 *                      example: 200
 *                  message:
 *                      type: string
 *                      description: message status
 *                      example: Successfully returned the books
 */
Router.delete('/return', booksController.delBookReturn)

module.exports = Router