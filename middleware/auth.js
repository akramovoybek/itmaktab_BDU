const express=require('express');
const {Teacher}=require('../models/teacher')
let ips={}

setInterval(() => {
  ips={}
}, 60*60000);



module.exports={auth:async (req,res,next)=>{
if((!req.session.teacherId)||(!req.session.teachername)){
  return  res.status(403).redirect('/teacher/');;
}
const my=await Teacher.findById(req.session.teacherId)
if(!my){
  return  res.status(403).redirect('/teacher/');;
}
if(my.firstname+' '+my.lastname!=req.session.teachername){
  return  res.status(403).redirect('/teacher/');;
}
next()
},
blocked:
(req,res,next)=>{
   let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
     console.log(ip)
    ips[ip]=(ips[ip] || 0)+1
    if(ips[ip]>50) 
    res.send("Sizning raqamingiz blocklandi.")
    else
    next()
}

}