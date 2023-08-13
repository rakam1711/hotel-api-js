const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes");


const app = express();
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/srmtest'

mongoose.connect(DATABASE_URL)
  .then(() => { console.log('connection established') })
  .catch((error) => { console.error(error) })

app.use('/', router)


const server = http.createServer(app)
server.listen(port ,()=>{
    console.log(`server established at port ${port}`);
})