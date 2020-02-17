const express = require('express')
const router = express.Router()
const tourController = require('../controllers/tourController')
const viewController = require('../controllers/viewController')
const {tourAuthrized, isLoggedIn} = require('../middle_ware/index')
const commentsRoutes = require('../routes/commentsRoutes')


router.use('/:tourId/comments', commentsRoutes)
//index - show all tours
router.get('/', tourController.getTours)

//new - show form to create New Tour
router.get('/new', isLoggedIn, tourController.newTourPage)


// show - showa more info about one tour
router.get('/:tourId', viewController.tourInfo)



// to check if the user is logged in
router.use(isLoggedIn)

//create - add New Tour to DB
router.post('/', tourController.saveTour)


// to check check if the user is authorized
// router.use(tourAuthrized)

//edit tour
router.get('/:tourId/edit', tourAuthrized, tourController.editTourPage)

// submit the edited tour to DB
router.patch('/:tourId', tourAuthrized, tourController.saveEditedTour)

// delete tour from DB
router.delete('/:tourId', tourAuthrized, tourController.deleteTour)

module.exports = router