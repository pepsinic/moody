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
	
	emotionM.find({}).sort({time: -1}).exec(function(err, records) { //SORT => invert the emotions to have the last one on top!
		// we need the times/emotions/userIDs and the usernames/userIDs and compare them with all the userID of emotions DB
		// console.log(records)

		res.render('emotions/index', {emotions: records, userID: res.locals.user._id, username : username.username})		
		// }
	})
})

router.post('/create', function(req, res) {  //first it create the emotion !!! 
	var emotion = req.body.emotionParam
	console.log(emotion)

	if(emotion === "1") {
		emotionID = 1
		console.log("Your choice is emotion 1: Happy")
	} else if(emotion === "2") {
		emotionID = 2
		console.log("Your choice is emotion 2: Soso")
	} else if(emotion === "3") {
		emotionID = 3
		console.log("Your choice is emotion 3: Unhappy")
	}
	
	emotionM.create({number: emotion, userID: res.locals.user._id}, function(err, records) {
		console.log(records)
		res.redirect("/emotions")
	})	
	
})

router.get("/month", (req, res) => { 
    console.log("going to month page")

    userID = {_id: res.locals.user._id}
	username = {username: res.locals.user.username} 
	console.log("WE ARE IN MONTH") 
	console.log(userID, username)

    emotionM.find({userID: res.locals.user._id}, function(err, records) {
    	console.log("all the records on month : " + records)
    	res.render("month", {emotions: records, userID: res.locals.user._id, username : username.username})
	})
}) 



module.exports = router

