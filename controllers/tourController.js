const moment = require('moment')
const Tour = require('../models/tourModel')
const Comment = require('../models/commentModel')

exports.getTours =  async (req, res)=> {
    try {
        const tours = await Tour.find({})
        res.render('index', {
            tours,
            pageTitle: 'tours'})
    } catch (e) {
        req.flash('error', 'Sorry!! something go wrong please contact the owner')
        res.redirect('/')
    }  
}

exports.saveTour =  async (req, res) => {
    try {
        const { name, image, description, price } = req.body
        const ownername = req.user.username
        const owner = req.user._id
        if (!name || !image || !description || !price) {
            return res.render('newTour', {
                name,
                image,
                description,
                price,
                error: 'Sorry! make sure you full all fields',
                pageTitle: 'New Tour'
            })
        }
        if( !ownername || !owner) {
            return res.render('newTour', {
                name,
                image,
                price,
                description,
                error: 'Sorry! You must login to do that',
                pageTitle: 'New Tour'
            })
        }
        // get data from form
        await new Tour({
            name,
            image,
            price,
            description,
            ownername,
            owner
        }).save()
        //redirect back to tours
        res.redirect('/tours')
    } catch (e) {
        req.flash('error', 'Sorry!! something go wrong please contact the owner')
        res.redirect('/tours')
    }
}

exports.newTourPage = (req, res) => {
    res.render('newTour', {pageTitle: 'New Tour'})
}



exports.editTourPage = async(req, res) => {
    try {
        const tour = req.tour
        res.render('editInfo', {tour, pageTitle: 'Edit'})
    } catch (e) {
        req.flash('error', 'Sorry! Something go wrong Please contact the owner')
        res.redirect('/tours')
    }
}

exports.saveEditedTour = async(req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.tourId, req.body, {
            runValidators: true,
            new: true
        })
        // console.log(req.body, req.tour)
        // const { name, image, description} = req.body
        // req.tour.name = name
        // req.tour.image = image
        // req.tour.description = description
        // req.tour.createdAt = moment(new Date().getTime()).format('ddd MMM YYYY h:mma')
        // const tour = await tour.save()
        res.redirect(`/tours/${tour._id}`)
    } catch (err) {
        console.log(err)
        req.flash('error', 'Sorry! Something go wrong Please contact the owner')
        res.redirect(`/tours/${req.tour._id}`)
    }
}

exports.deleteTour = async(req, res) => {
    try {
        await req.tour.remove()
        res.redirect(`/tours`)
    } catch (e) {
        req.flash('error', 'Sorry! Something go wrong Please contact the owner')
        res.redirect('/tours')
    }
}