const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Result} = require('../../models/result');


router.get('/:id',async (req,res)=>{
    let results=await Result.find({"themeId":req.params.id})
    .sort({nechta:-1})
    .select({nechta:1,counttest:1,studentId:1,_id:0,addDate:1})
    .populate('studentId','firstname lastname -_id')
    .exec()
    // console.log(results)
    // res.send(results);
    res.render('Tresult',{results:results});

})


module.exports=router