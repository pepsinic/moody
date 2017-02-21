const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")
const emotionM = mongoose.model("emotionCollection")



// routes =>
/* ------------------- INDEX -------------------*/
// GET  "/people"                     => show all people

/* ------------------- CREATE -------------------*/
// GET  "/people/create"                => Create new Person
// POST "/people/create"                => Create new Person
//                                 Redirect to "/people/:id"
// route.get .post.....come here

module.exports = router