const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Theme = require('../models/test').Theme;


router.get('/gettheme/:id', async (req, res) => {
    let gettheme1 = await Theme.find().select({__v:0});
    let massiv=[]
console.log(gettheme1[0].courseId)
    gettheme1.forEach((elem)=>{
        if(elem.courseId==req.params.id) 
        
        massiv.push(elem)
    })

    //console.log(a)
  
    if(!massiv){
        res.send('kategoriya yoq 1-cato')
    }
   if(massiv){
//    res.send('Ok hello');
    res.render('theme', { message:massiv })}
   
    else{
        res.send('mavzu yoq')
    }
   
    
    //  res.send('ok')

});

module.exports = router;
