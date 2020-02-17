const User = require('../models/userModel')
const passport = require('passport')
const validator = require('validator')



exports.signup = async (req, res) => {
        try {
            const { username, email, password, password2 } = req.body
            
            let error
            if (!username || !email || !password || !password2) {
                error= 'Please full all the fields'
                return res.render('register', {username, email, password, password2, error, pageTitle: 'Sign UP'})
            } 
            if (username.length < 6) {
                error= 'Name should be more than 6 characters'
                return res.render('register', {username, email, password, password2, error, pageTitle: 'Sign UP'})
            } 
             if (!validator.isEmail(email)) {
                error= 'Please enter a vail Email'
                return res.render('register', {username, email, password, password2, error, pageTitle: 'Sign UP'})
            } 
            
             if ( !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
                error= 'password should be minimum six characters, at least one letter and one number'
                return res.render('register', {username, email, password, password2, error, pageTitle: 'Sign UP'})
            }
            
            if (password !== password2) {
                error= 'Please match your passwords'
                return res.render('register', {username, email, password, password2, error, pageTitle: 'Sign UP'})
            }
            const user = await User.register(new User({username, email}), password)
            if (!user) {
                return res.status(400).redirect('/users/register')
            }
            console.log('pass 6')
            await passport.authenticate('local')
            req.flash('success' , `Welcome ${username} to yelpCamp please login to enjoy`)
            res.redirect('/users/login')
            console.log('pass')
        } catch (err) {
            console.log(err)
            req.flash('error', err.message)
            res.redirect('/users/register')
        }
}

exports.login = passport.authenticate('local', 
{ successRedirect: '/tours',
failureRedirect: '/users/login',
failureFlash: 'Invalid username or password.'})

exports.logout = (req, res) => {
    req.flash('success',`Goodbye ${req.user.username}! hope to see you again`)
    req.logOut()
    res.redirect('/tours')
}