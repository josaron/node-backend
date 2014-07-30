var User = require('./app/models/user');
var Msg = require('./app/models/msg');

exports.updateBuddyList = function(res, id1, id2) {
	console.log(res);
	//var alreadyInList = true;
	User.findById(id1, function(err, user) {
		if (err) {
			res.send(err);
		}
		var userConvoBuddies = user.convoBuddies;
		if (!inArray(userConvoBuddies, id2)) {
			//alreadyInList = false;
			//console.log("in if: " + alreadyInList);
			user.convoBuddies.push(id2);

			user.save(function(err) {
				if (err) res.send(err);

				res.send("send: " + id2 + " was added to " + id1 + "'s convoBuddies");
				res.json({ 
					message: "JSON: " + id2 + " was added to " + id1 + "'s convoBuddies"
				});
				//return id2 + " was added to " + id1 + "'s convoBuddies";
			});
		}
	});
	/*console.log("by return: " + alreadyInList);
	if (alreadyInList) {
		return id2 + " is already in " + id1 + "'s convoBuddies";
	}
	return id2 + " was added to " + id1 + "'s convoBuddies";*/
};

exports.inArray = function(array, element) {
	var size = array.length;
	for (var i = 0; i < size; i++) {
		if (array[i] === element) {
			return true;
		}
	}
	return false;
};