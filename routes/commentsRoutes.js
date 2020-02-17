const express = require('express')
const commentController = require('../controllers/commentController')
const viewController = require('../controllers/viewController')
const {isLoggedIn, commentAutherized} = require('../middle_ware/index')

const router = express.Router({ mergeParams: true })


//show the comment page
router.use(isLoggedIn)
router.get('/new', viewController.newCommentPage)
 
// save the comment to the DB
router.post('/', commentController.saveComment)

// to check if the user is  authorized
// router.use(commentAutherized)

// show comment page to edit
router.get('/:commentId/edit', commentAutherized, viewController.editCommentPage)

// submit the edited comment to DB
router.put('/:commentId', commentAutherized, commentController.saveEditedComment)

// delete tour from DB
router.delete('/:commentId', commentAutherized, commentController.deleteComment)

module.exports = router