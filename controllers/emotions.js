const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")
const emotionM = mongoose.model("emotionCollection")



router.get('/', function(req, res) {
	userID = {_id: res.locals.user._id}
	username = {username: res.locals.user.username} 
	console.log("WE ARE IN INDEX") 
	console.log(userID, username)
	
	mongoose.model("emotionCollection").find({}, function(err, records) { 
		// we need the times/emotions/userIDs and the usernames/userIDs and compare them with all the userID of emotions DB
		console.log(records)
		// for (var feeling of records){
		// console.log("£££££  " + feeling.userID, userID)
		res.render('emotions/index', {emotions: records, userID: res.locals.user._id, username : username.username})		
		// }
	})
})

router.post('/create', function(req, res) {  //first it create the emotion !!! 
	var emotionVAR = req.body.emotionParam
	console.log(emotionVAR)

	if(emotionVAR === "1") {
		emotionID = 1
		console.log("Your choice is emotion 1: Happy.")
	} else if(emotionVAR === "2") {
		emotionID = 2
		console.log("Your choice is emotion 2: OK.")
	} else if(emotionVAR === "3") {
		emotionID = 3
		console.log("Your choice is emotion 3: Unhappy.")
	}
	
	mongoose.model("emotionCollection").create({number: emotionVAR, userID: res.locals.user._id}, function(err, records) {
		res.redirect("/emotions")
	})	
	
})

router.get("/month", (req, res) => { 
    console.log("going to month page")
    userID = {_id: res.locals.user._id}
	username = {username: res.locals.user.username} 
	console.log("WE ARE IN MONTH") 
	console.log(userID, username)
    mongoose.model("emotionCollection").find({}, function(err, records) { 
    res.render("month", {emotions: records, userID: res.locals.user._id, username : username.username})
	})
}) 



module.exports = router

