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

router.get("*", (req, res, next) => { // next as 3rd arg + next() make a connection between the 2 router with "/"
	// console.log(res.locals) is object has properties that are local variables within the application.
	//res.locals.banana = 1
	if (req.cookies.sessionID){
		sessionID = {_id: req.cookies.sessionID}
		sessionM.findOne(sessionID, (error, SessionRecord) => {
		console.log("--------" + SessionRecord.userID)
		res.locals = SessionRecord.userID //we pass on a variable to the next handler
 		//res.render("page") // id, user NO NEED because next() jumps directly to the next handler
 		next()
    	})
    }		
	else {
		res.redirect("/logIn")
	}
})

router.get("/", (req, res) => { // the args are taken from the precedent handler funtion ( it a cascading objection modification)
	console.log(res.locals)
	userID = {_id: res.locals}
	// find the username with the userID
	userM.findOne(userID, (error, userRecords) => {
		console.log(userRecords)
		res.render("page", {username : userRecords.username})
	})

}) 



module.exports = router