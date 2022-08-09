const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv');
const app=express();

//database connection
dotenv.config({path:'./config.env'});
require('./db/connection');


//middleware
const middleware=(req,res,next)=>{
    console.log("Middleware");
    next();

}


//getrequest
app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.get('/tanmay',middleware,(req,res)=>{
    res.send("Tanmay");
});
app.get('/das',(req,res)=>{
    res.send("das");
});

app.listen(3000,()=>{
    console.log("Backend is running");
});