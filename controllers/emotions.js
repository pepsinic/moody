const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")
const emotionM = mongoose.model("emotionCollection")


// router.get('/:emotionParam', function(req, res){
// 	console.log("router CONNECTED")
// 	var emotionVAR = req.params.emotionParam

	// if(emotionVAR === "1") {
	// 	emotionID = 1
	// 	console.log("Your choice is emotion 1: Happy.")
	// } else if(emotionVAR === "2") {
	// 	emotionID = 2
	// 	console.log("Your choice is emotion 2: OK.")
	// } else if(emotionVAR === "3") {
	// 	emotionID = 3
	// 	console.log("Your choice is emotion 3: Unhappy.")
	// }

	// res.render("hereIsYourEmotion", {emotionID: emotionVAR})
// })

router.get('/', function(req, res) {
	mongoose.model("emotionCollection").find({}, function(err, records) {
		res.render('emotions/index', {emotions: records})
	})	
})

router.post('/create', function(req, res) {
	var emotionVAR = req.body.emotionParam
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
	mongoose.model("emotionCollection").create({number: emotionVAR}, function(err, records) {
		res.redirect("/emotions")
	})	
	
})


//app.get("/people/:id/delete", function(req, res){
//    var personID = req.params.id
//    res.render("delete", {id: personID}) // id
//})


module.exports = router