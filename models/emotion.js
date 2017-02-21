const mongoose = require("mongoose")
const Schema = mongoose.Schema

var emotionSchema = new Schema({
	number:  {
                type: Number,
                required: 'Emotion is required',               
                },

	time:      {
                type: Date,
                default: (new Date()).getTime() 
                }

})


mongoose.model("emotionCollection", emotionSchema)