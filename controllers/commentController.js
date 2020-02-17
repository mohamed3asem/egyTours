const moment = require('moment')
const Comment = require('../models/commentModel')

exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId)
        
        res.redirect(`/tours/${req.params.tourId}`)
    } catch (err) {
        console.log(err)
        req.flash('error', 'sorry! something go wrong please try again')
        res.redirect('/tours')
    }
}

exports.saveComment = async (req, res) => {
    try {
        const { tourId } = req.params
        const userId = req.user._id

        if (!tourId || !userId) {
            req.flash('error', 'sorry! something go wrong please try again')
            return res.redirect('/tours')
        }
        await Comment.create({
            content: req.body.comment,
            ownername: req.user.username,
            owner: userId,
            tour: tourId
        })
        res.redirect(`/tours/${tourId}`)
    } catch (e) {
        req.flash('error', 'please enter vaild URL')
        res.redirect('/tours')
    }
}

exports.saveEditedComment = async (req, res) => {
    try {
        const {tourId} = req.params
        const comment = req.comment
        comment.content = req.body.comment
        comment.createdAt = moment(new Date().getTime()).format('ddd MMM YYYY h:mma')
        await comment.save()
        res.redirect(`/tours/${tourId}`)
    } catch (e) {
        req.flash('error', 'sorry! something go wrong please try again')
        res.redirect('/tours')
    }
}