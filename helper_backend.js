var helper_js = require('./helper_js.js');
var User = require('./app/models/user');
var Msg = require('./app/models/msg');

exports.updateBuddyList = function(id1, id2) {
	User.findById(id1, function(err, user) {
		if (err) {
			res.send(err);
		}
		var userConvoBuddies = user.convoBuddies;
		if (!helper_js.inArray(userConvoBuddies, id2)) {
			user.convoBuddies.push(id2);

			user.save(function(err) {
				if (err) {
					res.send(err);
				}
				console.log(id2 + " was added to " + id1 + "'s convoBuddies");
			});
		}
		else {
			console.log(id2 + " was **ALREADY** added to " + id1 + "'s convoBuddies");
		}
	});
};

exports.clearDB = function(type) {
	type.remove({}, function(err) { 
   		console.log(type +' collection removed');
	});
}