const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const fs=require('fs')
const path=require('path')
const {google}=require('googleapis')

const {Theme} = require('../../models/test');
const {Course} = require('../../models/course');
const {blocked}=require('../../middleware/auth');
const multer = require('multer');



var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./views/uploads");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });
  
  var upload = multer({
    storage: Storage,
  }).single("file");
router.get('/:id',async (req,res)=>{
    let themes=await Theme.find({"courseId":req.params.id})
  
    res.render('Tmavzular',{themes:themes,id:req.params.id});

})
router.get('/downloadAFile/:fId',(req,res)=>{
    const filename0=downloadAFile(req.params.fId)
    res.send(__dirname+'/views/uploads/'+filename0)
})


router.post('/:id',blocked,async(req, res) => {
//Bu yerda Joi validatsiya
const myCourse=await Course.findById(req.params.id)
if(!myCourse){
 return   res.status(404).send("Bunday kurs mavjud emas!!!");
}
if(myCourse.trainer._id!=req.session.teacherId){
  return  res.status(403).send("Ushbu kursga mavzu qo'shishga sizga ruxsat berilmagan!!!");
}

upload(req, res, function (err) {
  if (err) {
    console.log(err);
    return res.end("Something went wrong");
  } else {
    console.log(req.file.path);
   
      
          console.log({id:req.file})
     
          const theme=new Theme({
            name:req.body.name,
            data:req.file.path,
            courseId:req.params.id
        })
        theme.save().then((info)=>{
             res.redirect('/teacher/addtheme/'+req.params.id);
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:err});
        }).finally(()=>{})
          
        }

      }
    );
  });
    
 




module.exports={router}