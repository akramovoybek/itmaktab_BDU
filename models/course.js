const mongoose=require('mongoose')

const {categorySchema} = require('./category')

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 255 }
})

const courseSchema = new mongoose.Schema({
    name: { type: String, minlength: 2, maxlength: 255 },
    category: { type: categorySchema, required: true },//kategiriyasi
    fee: { type: Number, required: true, min: 40000 }, //Kursning narxi
    trainer: { type: trainerSchema, required: true },//O'qituvchisi
    status: { type: String, default: 'Active', enum: ['Active', 'Passiv'] },//Kurs holati(ishlayaptimi yo'qmi)
    createdDate: { type: Date, default: Date.now() }
})

const Course=mongoose.model('course',courseSchema)



module.exports={Course}