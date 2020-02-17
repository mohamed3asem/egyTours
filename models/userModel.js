const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

mongoose.set('useCreateIndex', true)

const userSchema= mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Please give us your name'],
        min: 6
    },
    password: {
        type: String,
        min:6
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User