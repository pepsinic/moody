const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")
const emotionM = mongoose.model("emotionCollection")


router.post("/:feelingID", (req, res) => {  //works on getting username, time of emotion, emotion 
	//OR _id emotion!!!!!
    userID = res.locals.user._id
	username = res.locals.user.username
	feelingID = req.params.feelingID

 	console.log("getting the _id of that emotion: " + username, userID, feelingID) 
	
	emotionM.find({_id:feelingID}, function(error, feelingRecords) { 
	
		console.log(feelingRecords[0].time)
    	res.render("comment", {userID: res.locals.user._id, username : res.locals.user.username, time: feelingRecords[0].time, emotionNum: feelingRecords[0].number})
	})
})



// router.post("/create", (req, res) => { //
// 	userID = res.locals.user._id
// 	// take time to find the right emotion and time !!!!! -------------TO DO  FRIDAY
// 	var newComment = req.body.comment

// 	console.log("newComment  :  " + newComment)
	
// 	emotionM.findOneAndUpdate({userID : userID}).create({})
// 		res.render("comment", {comments: newComment})
// }) 



module.exports = router

