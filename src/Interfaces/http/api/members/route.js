const express = require("express")
const Router = express.Router()
const MembersController = require("./controller")
const container = require("../../../../Infrastructures/container")

const memberController = new MembersController(container)

Router.get('/', memberController.getMembers)

module.exports = Router