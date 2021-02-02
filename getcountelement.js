const mongoose=require('mongoose')
const db=process.env.DB||'mongodb+srv://Rtest:o27012001@cluster0.se58s.gcp.mongodb.net/Rtest?retryWrites=true&w=majority'
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log('Connected mongodb...')
})
.catch((err)=>{
    console.error(err);
})
mongoose.set('useFindAndModify',false)
const {Teacher}=require('./models/teacher')
Teacher.find().count().then(e=>   console.log(e))