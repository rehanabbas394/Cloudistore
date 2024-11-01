const mongoose = require('mongoose')
const { Schema } = mongoose;

const FormSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
})

const Model = mongoose.model("Form", FormSchema)

module.exports = Model;