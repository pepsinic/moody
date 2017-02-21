const mongoose = require("mongoose")
const Schema = mongoose.Schema

const findOrCreate = require('mongoose-findorcreate')

var userSchema = new Schema({
    username:  {
                type: String,
                trim: true, 
                lowercase: true,
                required: 'Username is required (at least 1 characters)',
                minlength: 1,
                unique: true
                },
    password:  {
                type: String,
                required: 'Password missing or too short (at least 6 characters)',
                minlength: 6
                }
}) // UserID automatiquement donné ! 

userSchema.plugin(findOrCreate);

mongoose.model("userCollection", userSchema)

// mongoose.connection.collections["usercollections"].drop( function(err) { 
// // the name of the collection MUST be without CAPITAL letter and plural!!!!!! otherwise undefined
//     console.log('collection dropped');
// })

