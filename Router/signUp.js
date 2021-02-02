const express = require('express');
const mongoose = require('mongoose');
const {downloadAFile}=require('./teacher/theme')
// const request = require('request')
// const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');
const router = express.Router();
const Student = require('../models/student').Student;
// let kod 
//  console.log(kod)
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         // user: 'itmaktab.uz@gmail.com',
//         user: 'mirazizergashev14@gmail.com',
//         pass: '1979mm2000'
//     }
// });

const passport = require('passport');
var userProfile;

router.use(passport.initialize());
router.use(passport.session());



// router.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET' 
// }));
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '808613490651-tpi36pmc4eohpd5tvbp1pifirpds83cl.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'EWi0AuKK45KrShn6ki82mEVq';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://google-bdu.herokuapp.com/student/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('https://google-bdu.herokuapp.com/student/success')
  });

router.get('/success', async(req, res) => {

    let userStudent = await Student.findOne({
        email: userProfile.emails[0].value,
        firstname: userProfile.name.givenName,
        lastname: userProfile.name.familyName
    })

    if(userStudent){
        req.session.userId = userStudent._id

        res.redirect('getcategory')
    }
    else{

    

    userStudent = new Student({
        login: 'Davlatov',
        firstname: userProfile.name.givenName,
        lastname: userProfile.name.familyName,
        password: 'Davlatov',
        email: userProfile.emails[0].value,
        kod: 'manemail'
    })
    await userStudent.save().then(() => {
       
        req.session.userId = userStudent._id

        res.redirect('getcategory')
    
})
    }});


router.get('/downloadAFile/:fId',(req,res)=>{
    const fpath=downloadAFile(req.params.fId)
    res.sendFile(__dirname+'/views/uploads/'+fpath)
})
router.get('/error', (req, res) => res.render('login2', {
    message: `Parol yoki login noto'g'ri kiritilgan`
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});




router.get('/', (req, res) => {
    res.render('signup2', {
        name: "",
        message: ""
    })
})




router.get('/authCheck', (req, res) => {
    res.render('checkmail', {
        name: "",
        message: ""
    })
})

router.get('/signup', (req, res) => {
    res.render('login2', {
        name: "",
        message: ""
    })
})

router.get('/login', (req, res) => {
    res.render('login2', {
        message: ""
    })
})

router.get('/aynan', (req, res) => {
    res.send('request uchun maxsus xona')
})

// setInterval(()=> {
//     request.get('https://itmaktab.herokuapp.com/student/aynan', async(error, response, body)=>{
//        await Student.deleteMany( { "status" : 'Passiv' })

//         console.log("error:",error)

//     //    res.send('s')
//    })   
//    },0000);

//royhatdan otish qismi tayyor(try catch ga olasan )
router.post('/signup', async (req, res) => {
    try {
        let login1 = await Student.findOne({
            login: req.body.login
        })
        let email1 = await Student.findOne({
            email: req.body.email
        })
        if (login1) {
            return res.render('signup2', {
                name: `${req.body.login}`,
                message: `nomli loginga ega foydalanuvchi mavjud iltimos boshqa login kiriting`
            })
        }
        if (email1) {
            return res.render('signup2', {
                name: `${req.body.email}`,
                message: `nomli emailga ega foydalanuvchi mavjud iltimos boshqa email kiriting kiriting`
            })
        }
        kod = '105500'
        userStudent = new Student({
            login: req.body.login,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            kod: kod
        })


        // let mailOptions = {
        //     from: 'mirazizergashev14@gmail.com',
        //     to: req.body.email,
        //     subject: 'Ro\'yhatdan o\'tish bo\'yicha itMaktab jamoasidan...',
        //     text: `itmaktab.herokuapp.com saytida ro\'yhatdan o'tish uchun kod => ${kod} <= shuni tezroq  saytiga joylang`
        // }


        setTimeout(() => {
            console.log('uchdi')
            Student.deleteOne({
                "status": 'Passiv',
                _id: userStudent._id
            })

        }, 5 * 60000);

        // transporter.sendMail(mailOptions, function (err, data) {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log('sent mail!!!')
        //     }
        // })

        await userStudent.save().then(() => {
            req.session.userId = userStudent._id
            // res.render('/login')
            // res.send('succesfull')
            res.render('login2', {
                message: "Muvaffaqiyatli o'tdingiz!!!"
            })
            // console.log(`${userStudent.firstname} siz muvaffaqiyatli ro'yhatdan o'tdingaaiz`)
        });
        console.log(kod)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});

Student.find().count().then((e) => {
    console.log(e)
})
router.post('/authCheck', async (req, res) => {
    try {
        let parolauth = await Student.findOne({
            _id: req.session.userId
        })
        console.log(req.session.userId)
        console.log(parolauth)
        if (!parolauth) {
            return res.render('checkmail', {
                message: `Tasdiqlash kodini xato kiritdingiz `,
                name: ''
            })
        }
        if (parolauth.kod != req.body.kod) {
            return res.render('checkmail', {
                message: `Tasdiqlash kodini xato kiritdingiz yoki vaqt tugadi`,
                name: ''
            })
        }

        if ((parolauth.kod.length == 10) && (parolauth.kod === req.body.kod)) {
            await Student.updateOne({
                kod: req.body.kod
            }, {
                $set: {
                    "status": 'Active'
                }
            })
            return res.render('login2', {
                message: 'Google pochta orqali kod tasdiqlandi',
                name: ''
            })
        }




    } catch (error) {
        console.log(error)
        res.send(error)
    }
});

//royhatdan otish qismi tayyor(try catch ga olasan )
router.post('/login', async (req, res) => {
    try {
        //console.log(req.body)

        let userStudent = await Student.findOne({
            login: req.body.login,
            password: req.body.password
        })
        // console.log(userStudent)

        if (!userStudent) {
            return res.render('login2', {
                message: `Parol yoki login noto'g'ri kiritilgan`
            })
        }

        req.session.userId = userStudent._id

        res.redirect('getcategory')
        //console.log(` siz muvaffaqiyatli ro'yhatdan o'tdingiz`)




    } catch (error) {
        console.log(error)
        res.send(error)
    }
});



router.get('/signout', async (req, res) => {
    delete req.session.userId
    res.render('login2', {
        message: ""
    })
})





module.exports = router