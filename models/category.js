const mongoose=require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 255 }
})
const Category = mongoose.model('category', categorySchema)

module.exports={Category,categorySchema}