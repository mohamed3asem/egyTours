const Tour = require('../models/tourModel')

exports.renderRegisterPage = (req, res) => {
    res.render('register', {user: req.user, pageTitle: 'Sign UP'})
}

exports.renderLoginForm =  (req, res) => {
    res.render('login', {user: req.user, pageTitle: 'Login'})
}

exports.tourInfo = async (req, res) => {
    try {
        const id = req.params.tourId
        const tour = await Tour.findById(id).populate({path: 'comments'})
        // const comments = await Promise.all (tour.comments.map( async (id) => {
        //    return await Comment.findById(id)
        // }))
        res.render('moreInfo', {tour, pageTitle: tour.name})
    } catch (e) {
        req.flash('error', 'Sorry! invalid URL')
        res.redirect('/tours')
    }   
}

exports.newCommentPage = (req, res) => {
    try {
        res.render('newComment', {
            tourId: req.params.tourId,
            user: req.user,
            pageTitle: 'Add Comment'
        })
    } catch (e) {
        req.flash('error', 'Sorry ! enter valid URL')
        res.redirect('/tours')
    }
}

exports.editCommentPage = async (req, res) => {
    try {
        const { tourId } = req.params
        const comment = req.comment
        res.render('editComment', {tourId, comment, user: req.user, pageTitle: 'Edit Comment'})

    } catch (e) {
        req.flash('error', 'sorry! something go wrong please try again')
        res.redirect('/tours')
    }
} 