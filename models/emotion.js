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
                },
    userId: {
    			type: String
    		}

})


mongoose.model("emotionCollection", emotionSchema)

// mongoose.connection.collections["emotioncollections"].drop( function(err) { 
// // the name of the collection MUST be without CAPITAL letter and plural!!!!!! otherwise undefined
//     console.log('collection dropped');
// })
