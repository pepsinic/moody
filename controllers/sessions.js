const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")

/*
GET  /signUp Show Sign Up form
POST /signUp Register User || Show sign Up Form with error messages
GET  /clean  Remove all user's records from your collection
GET  /       Display User Info (only works after signUp)
*/

router.get("/", (req, res) => {

    // req.cookies.sessionID
    // get the session from the DB
        //get the owner (user) of the session
    res.render("signUp/index")
})

router.get("/signUp/error", (req, res) => {
    res.render("signUp/error") // Here we don't put / before 
    //because otherwise it is an absolute path which means it start from the route of my file system
}) 

router.get("/signUp", (req, res) => {
    res.render("sessions/signUp")
})


router.post("/signUp", (req, res) => { ///signUp here is just what the user sees

    const userData = {email: req.body.email, password: req.body.password} // get the info from the body
    // save record to the db
    // I was doing this before : by creating 2 const with req.body...
    // and then putting it in {} so it created problems!!! I was creating this:
    // {newUser, password} => {newUser: {email: req.body.email}, password: {password: req.body.password}}
    userM.create(userData,(error, PersonRecord) =>{

        if(error) { //if error ... Show errors in signUp
            console.log("------------", error.message)
            res.render("signUp/error", {errors: error}) 
            //REDIRECT  = >/signUp/error is the path as URL we must indicate BUT WE CAN ADD INFORMATION
            //RENDER= >WITHOUT SLASH signUp/error reads the fill inside your folder
            return
            }

            else { //create session

            sessionM.create({userID: PersonRecord._id},(errors, SessionRecord) =>{ // add sessionID to cookie
        
                if(errors) { //maybe not necessary
                    console.log(errors)
                    res.render("signUp/error", {errors: error})
                    }

                else {  
                    console.log(SessionRecord)
                    res.cookie('sessionID', SessionRecord._id, { maxAge: 900000, httpOnly: false });
                    res.redirect("/users/page/" + SessionRecord._id) //OK now give back user!
                }
            })   
        }   
    })
})



module.exports = router //creates the privilegies that the users will have !