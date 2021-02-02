const express=require('express')
const router = express.Router();
const {Teacher}=require('../../models/teacher')
const {blocked}=require('../../middleware/auth')
//  async function delete10() {
    // await Teacher.updateMany( {"$set":{"status": "Active"}},(err, writeResult) => {
        // console.log(writeResult)
    // })
//    await Teacher.find().count().then((e)=>{
//         console.log(e)
    // })
//    const a=await Teacher.findOne({status:"Active"})
// a.status="Passiv"
// await a.save()
//   await  Teacher.deleteMany({status:"Active"}).then((e)=>{
//         console.log(e)
//     })
//     .catch(()=>{
//         console.log(-i)
//     })
// }
// for(var i=0;i<10;i++){
    // delete10()
// }
// var i=0;
// setInterval(() => {
//     i++
//     console.log(i)
    // delete10()
// }, 4000);
router.get('/signup',(req,res)=>{
    res.render('signup',{login:"",email:"",password:""});

})
router.get('/logout',(req,res)=>{
    delete req.session
     res.redirect('/teacher');

})
router.get('/',(req,res)=>{
    res.render('login',{message:""});

})

router.post('/signup',blocked,async (req,res)=>{
    //Buyerda joi validate
    let teacher=await Teacher.findOne({email:req.body.email})

    if( teacher){
        return res.render("signup",  {login:"",
    email:"Bu email bilan ro'yxatdan o'tilgan iltimos boshqa email kiriting!!!"})
    }else{
         teacher=await Teacher.findOne({login:req.body.login})

    if( teacher){
        return res.render("signup",  {login:"Bu login bilan ro'yxatdan o'tilgan iltimos boshqa email kiriting!!!",
    email:""})
    }else{
 teacher=new Teacher({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    login:req.body.login,
    email:req.body.email,
    password:req.body.password
})
console.log(teacher)
await teacher.save().then((info)=>{
     res.redirect('/teacher');
})
.catch((err)=>{
    console.log(err)
    res.send({message:err});
})
}
}
})

router.post('/login',async (req,res)=>{
  //Buyerda joi validate
  let teacher=await Teacher.findOne({password:req.body.password,login:req.body.login})
  if( !teacher){
      return res.status(403).render('login',{message:"Siz login yoki parolni noto'g'ri kiritdingiz"})
  }else{

// console.log(teacher)
req.session.teacherId=teacher._id  
req.session.teachername=teacher.firstname+' '+teacher.lastname
  res.status(200).redirect("/teacher/getcategory")
  }
})


module.exports=router