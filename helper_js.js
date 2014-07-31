exports.inArray = function(array, element) {
	console.log("inArray()");
	var size = array.length;
	for (var i = 0; i < size; i++) {
		if (array[i] === element) {
			return true;
		}
	}
	return false;
};