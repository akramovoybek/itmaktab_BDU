const express=require('express');
const router=express.Router();

module.exports=function auth2(req,res,next){
    if(req.session.userId){
        next()
    }
    else{
        res.status(400).render('login',{
            message:'Iltimos shaxsiy kabinetga kiring'
        });
    }
}

