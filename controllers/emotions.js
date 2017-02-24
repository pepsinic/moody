const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")
const emotionM = mongoose.model("emotionCollection")



router.get('/', function(req, res) {
	userID = {_id: res.locals.user} 
		console.log(userRecords)
		console.log(userID)
		mongoose.model("emotionCollection").find({}, function(err, records) { //CHECK IF SESSION connect to it!
			res.render('emotions/index', {emotions: records, userID: res.locals.user, username : userRecords.username})
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
	
	mongoose.model("emotionCollection").create({number: emotionVAR, userID: res.locals.user}, function(err, records) {
		res.redirect("/emotions")
	})	
	
})

router.get("/", (req, res) => { 
    console.log("going to month page")
    res.render("month")
}) 


module.exports = router