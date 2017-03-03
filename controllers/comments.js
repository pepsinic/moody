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
		var comment = (feelingRecords[0].comment || "")
		console.log(feelingRecords)
    	res.render("comment", {userID: res.locals.user._id, username : res.locals.user.username, 
    		time: feelingRecords[0].time, 
    		emotionNum: feelingRecords[0].number, 
    		emotionID : feelingRecords[0]._id,
    		comment: feelingRecords[0].comment})
	})
})



router.post("/:feelingID/create", (req, res) => { 
	userID = res.locals.user._id
	feelingID = req.params.feelingID
	var newComment = req.body.comment
	console.log("newComment  :  " + newComment)

	emotionM.findByIdAndUpdate({_id:feelingID}, {$set:{comment: newComment}}, function(error, feelingRecords) { 
		console.log("before newComment: " + newComment)
        if(error) { //if error ... Show errors in signUp
            console.log("--*--", error.message)
            res.render("comment")
        }
		feelingRecords.comment = newComment
		console.log("in records: " + feelingRecords.comment)
		console.log(feelingRecords)
    	res.render("comment", {userID: res.locals.user._id, username : res.locals.user.username, 
    		time: feelingRecords.time, 
    		emotionNum: feelingRecords.number, 
    		emotionID : feelingRecords._id, 
    		comment : feelingRecords.comment})
	})
}) 



module.exports = router

