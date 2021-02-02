//const { ConnectionStates } = require('mongoose');
const mongoose = require('mongoose')




const ThemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    data: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId
    }
});
const Theme = mongoose.model("theme", ThemeSchema);//sinf yaratildi

const testSchema = new mongoose.Schema({
    themeId: {
        type: mongoose.Schema.Types.ObjectId
    },
    question: { type: String, required: true, minlength: 3 }
    // key1: { type: String, required: true },
    // key2: { type: String, required: true },
    // key3: { type: String, required: true },
    // key4: { type: String, required: true },
    // isTrue: { type: Number, required: true }
});

const Test = mongoose.model("test", testSchema)


module.exports = { Theme,Test,testSchema}