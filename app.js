require("dotenv").config()
const express = require('express')
const app = express()
const router = require('./routes/router')
const path = require('node:path')

app.use(express.static('public'));
app.use('/',router)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Listening on port: ${PORT}`))