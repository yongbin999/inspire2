var m = require('./lib/db');

console.log("Loading courses from .csv");

m.populateCoursesAndPrereqs(function(err, data) {
	if(err) {
		console.log("ERROR Database not initialized: " + err);
	}
	else {
		console.log("Database successfully initialized");
	}
});