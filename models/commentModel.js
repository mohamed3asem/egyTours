const mongoose = require('mongoose')
const moment = require('moment')
const commentSchema = new mongoose.Schema({
    content: String,
    ownername: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: String,
        default: moment(new Date().getTime()).format('ddd MMM YYYY h:mma')
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: [true, 'comment must belong to a tour']
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment