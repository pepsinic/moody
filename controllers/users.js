const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")

// After the user sends its username & password, 
// we need to check for an user record with given password and username. 
// If found a new record of the session needs to be saved to DB in the session collection
//  with a sessionID & userID. 
//  Finally the session ID needs to be saved in the user cookie. 
//  Now the user can be redirected to the desire page



router.get("/", (req, res) => { // the args are taken from the precedent handler funtion ( it a cascading objection modification)
	userID = {_id: res.locals.user}
	// find the username with the userID
	userM.findOne(userID, (error, userRecords) => {
		console.log("I am in USERS : " + userRecords)
		res.render("page", {username : userRecords.username})
	})

}) 



// Create a route Post get the cookie id find the session id and delete that one then redirect to logIn

router.post("/logOut", (req, res) => { // the args are taken from the precedent handler funtion ( it a cascading objection modification)
	console.log("logging out")
	if (req.cookies.sessionID){
		sessionID = {_id: req.cookies.sessionID}
		sessionM.findOneAndRemove(sessionID, (error, SessionRecord) => {
			console.log("sessionID deleted")
 			res.redirect("/logIn")
    	})
    	return // need to return otherwise it will execute the second res.redirect and brake the code!!!!!
    }		
    res.redirect("/logIn")
	
})




module.exports = router