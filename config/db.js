// connect to DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/authenticationApp')

// require models
require("../models/user.js")
require("../models/session.js")
require("../models/emotion.js")


// THIS GENERATES A LOT OF DATE + EMOTIONS FOR USERID X
// var yourRandomGenerator=function(rangeOfDays,startHour,hourRange){
//     var today = new Date(Date.now());
//     return new Date(today.getYear()+1900, today.getMonth() - 2, today.getDate()+Math.random() *rangeOfDays, Math.random()*hourRange + startHour, Math.random()*60)
// }
// for(let i = 0; i<100; i++){
// 	mongoose.model("emotionCollection").create({
// 		userID: "58b4294f6c158d04d554fe87",
// 		number: (Math.floor(Math.random()*3) + 1),
// 		time: yourRandomGenerator(80, 1, 24)
// 	})
// }
