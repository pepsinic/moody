const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")

/*
GET  "/logIn" Show log In form
POST /signUp Register User || Show sign Up Form with error messages
GET  /clean  Remove all user's records from your collection
GET  /       Display User Info (only works after signUp)
*/


router.get("/", (req, res) => {
    console.log("going to logIn")
    // req.cookies.sessionID
    // get the session from the DB
        //get the owner (user) of the session
    res.redirect("/logIn")
})


router.get("/logIn", (req, res) => {
    console.log("is in logIn")
    res.render("logIn", {errors: " "}) // Here we don't put / before 
    //because otherwise it is an absolute path which means it start from the route of my file system
}) 


router.post("/logIn", (req, res) => { ///signUp here is just what the user sees

    const userData = {username: req.body.username, password: req.body.password} // get the info from the body
    console.log(userData)
    // save record to the db
    // I was doing this before : by creating 2 const with req.body...
    // and then putting it in {} so it created problems!!! I was creating this:
    // {newUser, password} => {newUser: {email: req.body.email}, password: {password: req.body.password}}

// 1 find user 
// 2 if user not find create user or PLUGIN "findOrCreate"
    userM.findOrCreate(userData,(error, PersonRecord) =>{

        if(error) { //if error ... Show errors in signUp
            console.log("------------", error.message)
            res.render("logIn", {errors: "Email or Password combination wrong & Password must be at least 6 characters long"})
        }

        //create session

        sessionM.create({userID: PersonRecord._id},(errors, SessionRecord) =>{ // add sessionID to cookie

            if(errors) { //not necessary but nice to have
                console.log(errors)
                res.render("logIn", {errors: error})
                return
            }
 
            console.log(SessionRecord)
            res.cookie('sessionID', SessionRecord._id, { maxAge: 900000, httpOnly: false });
            res.redirect("/users") //  /users to send to the controller users!!!! now give back user- to index(for us) and then smiley
        })   
  
    })
})




module.exports = router //creates the privilegies that the users will have !