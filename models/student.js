const mongoose=require('mongoose')

const studentSchema = new mongoose.Schema({
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
    courses:[new mongoose.Schema({
        name: { type: String, required: true, minlength: 2, maxlength: 255 },
        courseFee:Number,
        statusCourse: { type: String, default: 'Passiv', enum: ['Active', 'Passiv'] },
        addDate:{type:Date, default:Date.now()}
             })],//Maoshi
    isVip:{type:Boolean, default:false},
    bonusPoints:Number,
    status: { type: String, default: 'Active', enum: ['Active', 'Passiv'] }
})

const Student=mongoose.model('student',studentSchema)

module.exports={Student}