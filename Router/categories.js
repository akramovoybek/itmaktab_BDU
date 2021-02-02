const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Category = require('../models/category').Category;

// router.post('/addcategory',async(req,res)=>{
//     let addcategory = new Category({
//         name: req.body.name 
//     })

//     await addcategory.save().then(()=>{        
//         res.render('categories',{message:"Muvaffaqiyatli qoshildi"})
//        });      
// });

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


router.get('/getcategory', async (req, res) => {
    let addcategory = await Category.find().select({__v:0});
   
    // req.session.categ=addcategory[2]._id
   
    res.render('categories2', { message:addcategory })
    // res.send('ok')

});

module.exports = router;
