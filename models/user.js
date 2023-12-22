const mongoose = require('mongoose')

// defining user schema
const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


// creating model for userDB
const userCollection = new mongoose.model('userCollection', userSchema)

module.exports = userCollection