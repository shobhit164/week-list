const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    weeklistName : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    isCompleted : {
        type : Boolean,
        required : true
    },
    markedAt : {
        type : Date,
        default : null
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    deadline : {
        type : String,
    },
    weeklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "weeklistCollection",
        required: true,
    },
})

const taskCollection = new mongoose.model('taskCollection', taskSchema)

module.exports = taskCollection