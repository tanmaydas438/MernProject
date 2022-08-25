const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv');
const app=express();


//database connection
dotenv.config({path:'./config.env'});
require('./db/connection');

//json
app.use(express.json());

app.use(require('./routes/auth'));
require('./model/userSchema');


//getrequest
app.get('/',(req,res)=>{
    res.send("Hello World");
});



app.listen(3000,()=>{
    console.log("Backend is running");
});