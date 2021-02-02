const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Course = require('../models/course').Course;
const Category = require('../models/category').Category;

// router.post('/addcategory',async(req,res)=>{
//     let addcategory = new Category({
//         name: req.body.name,
//         about:req.body.about
//     })

//     await addcategory.save().then(()=>{  
//         res.send('OK Google...')      
//     //     res.render('categories',{message:"Muvaffaqiyatli qoshildi"})
//     //    });      
// })});

router.get('/getcourses/:id', async (req, res) => {
    let addcourse = await Course.find().select({__v:0});
    //console.log(addcourse)
    let a=[]
    addcourse.forEach((elem)=>{
        if(elem.category._id==req.params.id) a.push(elem)
    })

    if(!a){
        res.send('kategoriya yoq 1-cato')
    }
   if(a){
//    res.send('Ok hello');
    res.render('courses', { message:a })}
   
    else{
        res.send('kategoriya yoq')
    }

});

module.exports = router;
