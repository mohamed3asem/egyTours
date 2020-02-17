const mongoose = require('mongoose')
const moment = require('moment')

const tourSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    ownername: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    price: Number,
    createdAt: {
        type: String,
        default: moment(new Date().getTime()).format('ddd MMM YYYY h:mma')
    }
})

// virtual populate
tourSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'tour',
    localField: '_id'
})

const Tour = mongoose.model('campground', tourSchema)

module.exports = Tour