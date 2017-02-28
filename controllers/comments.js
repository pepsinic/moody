const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const sessionM = mongoose.model("sessionCollection")
const emotionM = mongoose.model("emotionCollection")



router.get("/", (req, res) => { 
    userID = res.locals.user._id
	username = res.locals.user.username
 	console.log("I am in COMMENTS of the user : " + username) 
	//console.log(userID, username)
 //    mongoose.model("emotionCollection").find({}, function(err, records) { 
 //    res.render("month", {emotions: records, userID: res.locals.user._id, username : username.username})
	// })
	res.render("comment", {username: username})
})

router.post("/create", (req, res) => {
	//userID = res.locals.user._id
	var newCommentRecord = req.body.createComment
	console.log("newCommentRecord  :  " + newCommentRecord)

	var emotionData = mongoose.model("emotionCollection", emotionSchema);
}) 




/*
app.post("/people", function(req, res){
    const newPersonRecord = {name: req.body.submittedName}
    mongoose.model("personCollection").create(newPersonRecord, (error, PersonRecord) =>{
        if(error) {
            console.log("there's be an error")
            res.redirect("/")
            return
        }
        res.redirect("/people/" + PersonRecord._id)
    })
})
*/











//////////////////////////////////
////////////
/*
router.get('/get-data', function(req, res, next) {
	var resultArray = []
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('user-data').find();
		console.log('Cursor created..')
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
			console.log('Push attempt..')
		}, function() {
			db.close();
			console.log('Write ATTEMPT registered..')
			res.render('index', {object: resultArray});
		});
	});
});

router.post('/insert', function(req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};

	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('user-data').insertOne(item, function(err, result) {
			assert.equal(null, err);
			console.log('Item inserted')
			db.close();
		});
	});
	res.redirect('/');
});

////////////

router.get('/', function(req, res) {
	userID = {_id: res.locals.user._id}
	username = {username: res.locals.user.username} 
	console.log("WE ARE IN INDEX") 
	console.log(userID, username)
	
	mongoose.model("emotionCollection").find({}, function(err, records) { 
		// we need the times/emotions/userIDs and the usernames/userIDs and compare them with all the userID of emotions DB
		console.log(records)
		// for (var feeling of records){
		// console.log("£££££  " + feeling.userID, userID)
		res.render('emotions/index', {emotions: records, userID: res.locals.user._id, username : username.username})		
		// }
	})
})

*/
////////////
/////////////////////////







module.exports = router

