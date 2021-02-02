const mongoose=require('mongoose')

const teacherSchema = new mongoose.Schema({
    firstname: { type: String, required: true, minlength: 2, maxlength: 255 },
    login: { type: String, required: true, minlength: 2, maxlength: 255 },
    lastname: { type: String, minlength: 2, maxlength: 255 },
    email: {
        type: String,
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 64
    },
    salary: { type: Number, min: 0 },//Maoshi
    status: { type: String, default: 'Active', enum: ['Active', 'Passiv'] }
})

const Teacher=mongoose.model('teacher',teacherSchema)
// console.log(("5f745fd464ef860024d44e95").getTimestamp().getUTCMonth())
module.exports={Teacher}