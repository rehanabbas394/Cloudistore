const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const ImageRouter =require("./routes/imageRoutes")
const connectdb = require("./model/db")
const countRequest = require("./Middleware/countRequest")

// initialize express app
const app = express()
const port= process.env.PORT

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(countRequest("Request.txt"));

// connect mongodb
connectdb()

// Template Engine
app.set("view engine", "ejs")
app.set("views","./views")

// Routes
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/image', ImageRouter)

// Server listening
app.listen(port, () => {
  console.log(`Server app listening on port ${port}`) 
})