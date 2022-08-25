const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const { model } = require('mongoose');
const router=express.Router();
require("../db/connection");
const User=require("../model/userSchema");

router.get('/',(req,res)=>{
    res.send("From auth");
});

/*
router.post('/register',(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        return res.status(422).json({error:"fill the mandatory fields"});   
    }
    
    User.findOne({email:email})
        .then((userExist)=>{
            if(userExist)
            {
                return res.status(422).json({error:"email already exists"});  
            }
            const user=new User({name,email,phone,work,password,cpassword});
            user.save().then(()=>{
                res.status(201).json({message:"Successfully registered"});
            }).catch((err)=>{
                res.status(500).json({error:"Registration failed"});
            });
        }).catch((err)=>{console.log(err)});
})
*/

router.post('/register',async(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        return res.status(422).json({error:"fill the mandatory fields"});   
    }
    try{
        const userExist= await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"email already exists"});
        }
        const user=new User({name,email,phone,work,password,cpassword});
        await user.save();
        res.status(201).json({message:"Successfully registered"});
        
    }catch(err){
        console.log(err);
    }
    
})


router.get('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(422).json({error:"fill the mandatory fields"});   
    }
    try{
        const userExist= await User.findOne({email:email});
        if(!userExist){

            return res.status(422).json({error:"Email is not registerd"});
        }
        const pass=userExist.password;
        const isMatch=bcrypt.compare(password,pass);
        if(isMatch)
        {
            const token=await userExist.generateJWT();
            //console.log(token);
                res.cookie("jwtoken",token,{
               expires:new Date(Date.now() + 25892000000),
               httpOnly:true 
            });
            return res.status(200).json({error:"login successfull"});
        }
        else
        {
            return res.status(400).json({message:"Wrong password"});
        }
    }catch(err){
        console.log(err);
    }
    
})

module.exports=router;