const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Category = require('../../models/category').Category;

// router.post('/addcategory',async(req,res)=>{
//     let addcategory = new Category({
//         name: req.body.name 
//     })

//     await addcategory.save().then(()=>{        
//         res.render('categories',{message:"Muvaffaqiyatli qoshildi"})
//        });      
// });

router.get('/', async (req, res) => {
    let allCategory = await Category.find().select({__v:0});
    console.log(allCategory)
    console.log(allCategory.length)
    //for(var i=0;i<addcategory.length;i++)
    res.render('categories', { categories:allCategory })

});

module.exports = router;