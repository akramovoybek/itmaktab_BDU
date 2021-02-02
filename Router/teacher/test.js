const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Test} = require('../../models/test');
const {blocked}=require('../../middleware/auth')


router.get('/:id',async (req,res)=>{
    const tests=await Test.find({themeId:req.params.id})
    console.log(tests)
    if(tests.length>0){
        res.render('Ttestlar',{tests:tests,id:req.params.id});
    }
    else{
        res.send('Ttestlar');
    }
    

})


router.post('/:id',blocked,async (req, res) => {
//Bu yerda Joi validatsiya
const test=new Test({
    themeId:req.params.id,
    question:req.body.question
//   key1:req.body.key1,
//   key2:req.body.key2,
//   key3:req.body.key3,
//   key4:req.body.key4,
//  isTrue:req.body.isTrue,
 
})
await test.save().then((info)=>{
     res.redirect('/teacher/addtest/'+req.params.id);
})
.catch((err)=>{
    console.log(err)
    res.send({message:err});
})
});



module.exports=router