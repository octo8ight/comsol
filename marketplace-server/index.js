require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const fileupload = require('express-fileupload')
const  apiRoutes = require('./src/routes')
const bodyParser = require('body-parser')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error',(error)=>{
    console.log("Error",error.message)
})
mongoose.connection.once('open', () => console.log("MongoDB connected: "+process.env.DATABASE));

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
// server.use(fileupload())
server.use(bodyParser.json())

server.use('/public/data/uploads', express.static(__dirname+'/public/data/uploads'))
server.use('/',apiRoutes)
server.listen(process.env.PORT, ()=>{
    console.log("server is running at port: "+process.env.PORT)
})