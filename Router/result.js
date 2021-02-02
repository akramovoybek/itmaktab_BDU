const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {signUp}=require('./signUp')


router.get('/result',async(req,res)=>{
    // const person=await signUp.find().sort({result:-1,stopdate:1});
    // res.send(person);
})

module.exports=router