const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    author_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    books:{
        type:[]
    }
})

const Books = mongoose.model("books",bookSchema)
module.exports = Books