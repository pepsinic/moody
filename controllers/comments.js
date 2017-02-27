const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")
const emotionM = mongoose.model("emotionCollection")



router.get("/comment", (req, res) => { 
    console.log("going to comment")
    userID = {_id: res.locals.user._id}
	username = {username: res.locals.user.username} 
	console.log("WE ARE IN MONTH") 
	console.log(userID, username)
 //    mongoose.model("emotionCollection").find({}, function(err, records) { 
 //    res.render("month", {emotions: records, userID: res.locals.user._id, username : username.username})
	// })
	res.render("comment")
}) 


module.exports = router