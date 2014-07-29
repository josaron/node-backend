// app/models/msg.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MsgSchema   = new Schema({
	senderId: String,
	receiverId: String,
	text: String,
	timestamp: { 
		type: Date, 
		default: Date.now 
	}
});

module.exports = mongoose.model('Msg', MsgSchema);