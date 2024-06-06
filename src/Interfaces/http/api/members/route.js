const express = require("express")
const Router = express.Router()
const MemberController = require("./controller")
const container = require("../../../../Infrastructures/container")

const memberController = new MemberController(container)

Router.get('/', memberController.getMembers)

module.exports = Router