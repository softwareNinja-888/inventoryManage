require("dotenv").config()
const express = require('express')
const app = express()
const router = require('./routes/router')
const path = require('node:path')

// MIDDLEWARE FIRST
app.use(express.urlencoded({ extended: true })); // <- This is critical!
app.use(express.static('public'));

// VIEW ENGINE SETUP
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))

// LOAD ROUTES LAST
app.use('/',router)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Listening on port: ${PORT}`))