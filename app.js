const express = require('express')
const app = express()
const passport = require('passport')
const localStrategy= require('passport-local').Strategy
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const methodOverride = require('method-override')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

//requiring routes
const tourRoutes = require('./routes/tourRoutes')
const userRoutes = require('./routes/userRoutes')
const User = require('./models/userModel')

app.set('view engine', 'ejs')

// esxpress confirguration
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


// passport configuration
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(flash())
app.use((req, res, next) => {
    res.locals.error= req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.user = req.user
    next()
})

// set security HTTP HEADERS
app.use(helmet())

//limit requests from same api
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an hour'
})
app.use(limiter)

// data sanitization againt NOSQL query injection
app.use(mongoSanitize())

// data sanitization  againt XSS
app.use(xss())

//======routes====
app.get('/', (req, res) => {
    res.render('landing', {user: req.user, pageTitle: 'EgyTours'})
})

app.use('/users', userRoutes)

app.use('/tours', tourRoutes)

app.get('*', (req, res) => {
    req.flash('error', 'please enter valid URL')
    res.redirect('/')
})

module.exports = app

