const Comment = require('../models/commentModel')
const Tour = require('../models/tourModel')
// to check if the user own the comment
async function commentAutherized (req, res, next) {
        try {
            const comment = await Comment.findOne({ 
                _id: req.params.commentId,
                owner: req.user._id, })
            if (!comment) {
                req.flash('error', 'Sorry! You cant to do that')
                return res.redirect(`/tours/${req.params.tourId}`)
            }
            req.comment = comment
            return next()
            
        } catch (e) {
            req.flash('error', 'Sorry! something go wrong please make sure you entered a valid URL or contact the owner')
            return res.redirect('/tours')
        }
}

// to check if the user is loggedin
function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next() 
    }
    req.flash('error', 'you need to be logged in to do that')
    res.redirect('/users/login')
}

// to check if the user own the camp
async function tourAuthrized (req, res, next) {
    try {
        const tour = await Tour.findOne({_id: req.params.tourId, owner: req.user._id})
        if (!tour) {
            req.flash('error', 'Sorry! You cant to do that')
            return res.redirect(`/tours/${req.params.tourId}`)
        }

        req.tour = tour
        return next()
    } catch (e) {
        req.flash('error', 'Sorry! something go wrong please make sure you entered a valid URL or contact the owner')
        return res.redirect('back')
    }
}

module.exports = {
    isLoggedIn,
    commentAutherized,
    tourAuthrized

}