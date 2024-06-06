const memberRoute = require('./members/route')
const bookRoute = require('./books/route')
const express = require('express')
const app = express()


app.use('/member', memberRoute)    
app.use('/book', bookRoute)

module.exports = app