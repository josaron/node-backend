// server.js


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

var User = require('./app/models/user');
var Msg = require('./app/models/msg');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});



// more routes for our API will happen here

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

	// create a bear (accessed at POST http://localhost:8080/api/users)
	.post(function(req, res) {
		
		var user = new User(); 		// create a new instance of the User model
		user.name = req.body.name;  // set the users name (comes from the request)

		// save the bear and check for errors
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});
		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});


// on routes that end in /user/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

	// get the user with that id (accessed at GET http://localhost:8080/api/bears/:user_id)
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})


	// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req, res) {

		// use our user model to find the bear we want
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

			user.name = req.body.name; 	// update the bears info

			// save the bear
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// on routes that end in /msg
// ----------------------------------------------------
router.route('/msgs')

	// create a msg (accessed at POST http://localhost:8080/api/msgs)
	.post(function(req, res) {
		
		var msg = new Msg(); 		// create a new instance of the Msg model
		msg.senderId = req.body.senderId;   // set the msgs sender
		msg.receiverId = req.body.receiverId;   // set the msgs receiver
		msg.text = req.body.text;  // set the msgs text

		// save the bear and check for errors
		msg.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Message created!' });
		});
		
	})

	// get all the msgs (accessed at GET http://localhost:8080/api/msgs)
	.get(function(req, res) {
		Msg.find(function(err, msgs) {
			if (err)
				res.send(err);

			res.json(msgs);
		});
	});


// on routes that end in /msg/:msg_id
// ----------------------------------------------------
router.route('/msgs/:msg_id')

	// get the user with that id (accessed at GET http://localhost:8080/api/msgs/:msg_id)
	.get(function(req, res) {
		Msg.findById(req.params.msg_id, function(err, msg) {
			if (err)
				res.send(err);
			res.json(msg);
		});
	})


	// update the user with this id (accessed at PUT http://localhost:8080/api/msgs/:msg_id)
	.put(function(req, res) {

		// use our user model to find the msg we want
		Msg.findById(req.params.msg_id, function(err, msg) {

			if (err)
				res.send(err);

			msg.senderId = req.body.senderId;
			msg.receiverId = req.body.receiverId;
			msg.text = req.body.text; 	// update the msgs info

			// save the msg
			msg.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Message updated!' });
			});

		});
	})

	// delete the user with this id (accessed at DELETE http://localhost:8080/api/msgs/:msg_id)
	.delete(function(req, res) {
		Msg.remove({
			_id: req.params.msg_id
		}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);





// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
