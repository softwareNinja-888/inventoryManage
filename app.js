require("dotenv").config()
const express = require('express')
const app = express()
const router = require('./routes/router')

app.set('view engine','ejs')
app.get('/',router)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Listening on port: ${PORT}`))