const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")

// After the user sends its username & and password, 
// we need to check for an user record with given password and username. 
// If found a new record of the session needs to be saved to DB in the session collection
//  with a sessionID & userID. 
//  Finally the session ID needs to be saved in the user cookie. 
//  Now the user can be redirected to the desire page

router.get("/signIn", (req, res) => {  //we don't need to put /users in front as it is already the path
    res.render("users/signIn")
}) 

router.post("/signIn", (req, res) => { 
	const userData = {email: req.body.email, password: req.body.password} 
	console.log(userData) 
    res.render("users/signIn")
}) 

router.get("/page/:id", (req, res) => { 
    res.render("users/page")
}) 




module.exports = router