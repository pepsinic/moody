const mongoose = require("mongoose")
const Schema = mongoose.Schema

var numberSchema = new Schema({
    userID:    {type: number, required: true}
})

var timeSchema = new Schema({
	userID: {type: Date, default:(new Date().getTime()
	})

mongoose.model("sessionCollection", sessionSchema)