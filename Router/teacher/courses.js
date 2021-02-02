const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Course} = require('../../models/course');
const {Category} = require('../../models/category');
const {blocked}=require('../../middleware/auth')
router.get('/:id',async (req,res)=>{
    let courses=await Course.find({"category._id":req.params.id})
    
    res.render('Tkurslar',{courses:courses,id:req.params.id,me:req.session.teachername,meId:req.session.teacherId});

})


router.post('/:id',blocked,async (req, res) => {
//Bu yerda Joi validatsiya
const categoryname=await Category.findById(req.params.id).select({name:1})
const course=new Course({
    name:req.body.name,
    category:{
        _id:req.params.id,
        name:categoryname},
    fee:req.body.fee,
    trainer:{ 
        _id:req.session.teacherId,
         name: req.session.teachername}
})
const saveCourse=await course.save()
res.redirect('/teacher/addcourse/'+req.params.id);

});



module.exports=router