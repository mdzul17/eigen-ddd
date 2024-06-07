const express = require("express")
const Router = express.Router()
const MembersController = require("./controller")
const container = require("../../../../Infrastructures/container")

const memberController = new MembersController(container)

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       description: array of returned books data
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the member
 *       example:
 *         name: John Doe
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Members endpoint API docs
 */

/**
 * @swagger
 * /member:
 *   get:
 *     summary: Returns the list of all the members
 *     tags: [Members]
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
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Member'
 */

Router.get('/', memberController.getMembers)

/**
 * @swagger
 * /member:
 *   post:
 *     summary: Adding a member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *     responses:
 *       201:
 *         description: Returning book successfully
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
 *                      description: inputted book data
 *                      properties:
 *                         code:
 *                              type: string
 *                              description: The code of member
 *                         name:
 *                              type: string
 *                              description: Name of member
 */
Router.post('/', memberController.postMember)
module.exports = Router