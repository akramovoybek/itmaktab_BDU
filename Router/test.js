const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Test = require('../models/test').Test
const { Result } = require('../models/result')
const signUp = require('../models/student').Student
const { Theme } = require('../models/test')



//admin test kiritish qismi
// router.post('/addquiz', async (req, res) => {
//     let test = new Test({
//         savol: req.body.savol,
//         key1: req.body.key1,
//         key2: req.body.key2,
//         key3: req.body.key3,
//         key4: req.body.key4,
//         isTrue: req.body.isTrue
//     })
//     await test.save();
//     res.send(test);
// })

router.get('/getquiz/:id', async (req, res) => {
    let test = await Test.find({themeId: req.params.id})
    
    
    //    console.log(test);
    let a = test
   
    //console.log(a)

    if (!a) {
        res.send('Mavzu yoq 1-cato')
    }
    if (a) {
        //    res.send('Ok hello');
        res.render('test2', {
            message: a,
            test: test,
            count: (test).length,
            themeid:req.params.id
           
        })
    }

    else {
        res.send('Mavzu yoq')
    }


})


//javoblani kiritish qismi yanikim tests yechish qismi
router.post('/starttest/:id', async (req, res) => {
    //const person = await signUp.findById(req.session.userId)
    //if (person && person.result > 0) return res.send("Siz bir marotaba test ishladingiz, qayta bajara olmaysiz.")
    console.log(req.body)
    let k = false, m = 0,s=0, kkk = [];
//     for (key in req.body) {
//         data = await Test.findById(key)   
         
        
//         k = (data.isTrue == req.body[key])
//         if (k) m++
//         kkk.push({
//             'cheked': req.body[key],
//             'testId': key,
//             'tugri': data.isTrue
//         })
//         s++;
//        // console.log(req.body[key].length)
//     }
//     let nomi=await Theme.findById(req.params.id).select({name:1})
//         const answer = new Result({
//             answers: kkk,
//             nechta:m,
//             counttest: s,
//             studentId: req.session.userId,
//             themeName:nomi.name,
//            themeId:req.params.id
//         })
//      await   answer.save()
        
// console.log(nomi)


        // delete req.session
        // Result.findById(req.session.userId).then((malumot)=>{
        //     res.send({ "To'g'ri javoblar soni: ": m });
        //     console.log(malumot)
        // })
        // console.log(req.session.userId)
        // console.log(answer.studentId)
        res.render('result',{message:"zdfg",ismi:"fgh"})
        
    
   
})


router.get('/allresult', async (req, res) => {
    console.log(req.session.userId)
    let natija = await Result.find({studentId: req.session.userId})
    
    //console.log(natija)
    res.render("allresult",{message:natija})
    // res.send('ok google')

})


module.exports = router;












// s++; console.log(`s-> ${s}`)
// if (soni>=2*chistiy) {   
//     console.log(l)        
//     console.log(req.body[ele])
//     l++; a[l - 1].id = req.body[ele];
// }
// else {           
//     //sv.id = '';
//     if (req.body[ele].length > 2) {
//         l++; a[l - 1].id = req.body[ele];
//         m++;a[m-1].answer='0'

//     }
//     else {
//         a[0].answer='0'
//         m++;a[m-1].answer=req.body[ele];

//     }           

//     console.log(a);

//     soni++;
//     console.log(`pastdagi son ${soni}`)
// }

// if (s === 2 * parseInt(req.body.fcount)) {
//     // console.log(req.body.fcount); 
//     break
// }