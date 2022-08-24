const express=require('express')
const mongoose = require("mongoose");
const { TodoRouter } = require('./Routes/Todo.Routes');
const { UserRouter } = require('./Routes/User.Routes');
const dotenv = require("dotenv").config();
const app=express()
const cors = require("cors");
const server = require('http').Server(app)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
    cors({
      origin: true,
      credentials: true,
      sameSite: "none",
      optionSuccessStatus:200
    })
  );

app.get('/',(req,res)=>{res.send('mock10')})
app.use("/todos",UserRouter)
app.use("/todos",TodoRouter)

const PORT = process.env.PORT || 8080;
const mongoDB = process.env.MongoAtlas;
console.log(mongoDB);
server.listen(PORT,()=>{
    mongoose.connect(mongoDB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("server connection established");
    })
    .catch((err)=>{
        console.log( "Falied to establish the connection");
    })
    console.log(`server started on port ${PORT}`)
})