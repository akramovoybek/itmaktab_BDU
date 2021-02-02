const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const express = require('express');


const app = express()
const signTeacher = require('./Router/teacher/sign')
const categoryTeacher = require('./Router/teacher/categories.js')
const addCourseTeacher = require('./Router/teacher/courses.js')
const addThemeTeacher = require('./Router/teacher/theme').router
const addTestTeacher = require('./Router/teacher/test')
const resultTeacher = require('./Router/teacher/result')
//student
const up=require('./Router/signUp');
const auth2=require('./middleware/auth2')
const categories=require('./Router/categories');
const course=require('./Router/courses')
const theme=require('./Router/theme')
const test=require('./Router/test')
const result=require('./Router/result')
const allresult=require('./Router/allresult')
const {
    auth,
    blocked
} = require('./middleware/auth')
// const RequestIp = require('@supercharge/request-ip')

// const expressMiddleware = function (req, res, next) {  
//   req.ip = RequestIp.getClientIp(req)
// console.log(req.ip)
//   next()
// }


// app.use(expressMiddleware);
app.use(cookieParser())
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    // store: new FileStore({path: require("path").join(require("os").tmpdir(),"session-store")}),
    cookie: {
        maxAge: 3600000,
        secure: false
    }
}));
require('./secury')
const db = process.env.DB || 'mongodb+srv://Rtest:o27012001@cluster0.se58s.gcp.mongodb.net/google?retryWrites=true&w=majority'
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected mongodb...')
    })
    .catch((err) => {
        console.error(err);
    })
mongoose.set('useFindAndModify', false)

app.set('view engine', 'ejs')
app.use('/teacher/getcategory', express.static('views'))


app.use('/teacher/addcourse', express.static('views'))
app.use('/teacher', express.static('views'))
app.use('/teacher/addtheme', express.static('views'))
app.use('/teacher/addtest', express.static('views'))
app.use('/teacher/results', express.static('views'))

app.use('/',express.static('views'))
app.use('/student/up',express.static('views'));
app.use('/student/getcourses',express.static('views'));
app.use('/student/getcategory',express.static('views'))
app.use('/student/gettheme',express.static('views'))
app.use('/student/getquiz',express.static('views'))
app.use('/student/starttest',express.static('views'))
app.use('/student/allresult',express.static('views'))
app.use('/student/result',express.static('views'))
app.use('/student/signout',express.static('views'))
app.use('/student/',express.static('views'))

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// const FileStore = require('session-file-store')(session);




//*f9-*+959f2ef
app.get('/admin', (req, res) => {
    // res.send(req.session);
    // console.log(req.session)
    res.redirect('/teacher/');
});

app.get('/',(req,res)=>{
    res.redirect('/student/')
  })
  
  app.use('/student/',up);
  
  app.use('/student',auth2,categories);
  app.use('/student',auth2,course)
  app.use('/student',auth2,theme);
  app.use('/student',auth2,test);
  app.use('/student',auth2,result);
  app.use('/student',allresult)
  

app.use('/teacher/results/', auth, resultTeacher)
app.use('/teacher/getcategory', auth, categoryTeacher)
app.use('/teacher/addcourse', auth, addCourseTeacher)
app.use('/teacher', signTeacher)
app.use('/teacher/addtheme', auth, addThemeTeacher)
app.use('/teacher/addtest', auth, addTestTeacher)

//*+595rf6eg5frg

const port = process.env.PORT || 2001

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});