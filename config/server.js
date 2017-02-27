var express = require("express")
var app = express()  // => app is the whole app access and router is the next separation 

// Set view engine folder
app.set('view engine', 'ejs')
app.set('view cache', false);

// Body parser for forms
var bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Access cookies as objects
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// public assets
app.use('/public', express.static('public'))

// initialize Controllers
var sessionsController = require("../controllers/sessions")
app.use("/", sessionsController)

// create a new controller that will direct the route from sessions.js to users.js
var usersController = require("../controllers/users") 
app.use("/users", usersController) // this is routing to the controllers users so we must render /users from the session controller to send it there


var emotionsController = require("../controllers/emotions") 
app.use("/emotions", emotionsController)

var commentsController = require("../controllers/comments")
app.use("/comments", commentsController)

app.listen(3001, function() {
    console.log("listening in port 3001")
})