const mongoose = require('mongoose')

const weeklistSchema = new mongoose.Schema({
    weeklistName : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default: Date.now
    },
    expireOn : {
        type : Date,
        default : () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    timeLeft : {
        type : String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
        required: true,
    },

})

const weeklistCollection = new mongoose.model('weeklistCollection', weeklistSchema)

module.exports = weeklistCollection