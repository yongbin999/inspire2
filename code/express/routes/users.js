var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');
var m = require('../lib/db');


// # User Server-Side Routes



router.get('/testing', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/testview', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet',
				username : user.id,
				schoolorg:user.schoolorg});
	}
});





router.get('/newpage', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/newpage', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet'});
	}
});


router.get('/major_track', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/major_track', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet'});
	}
});





//routes for getting their stored list of classes planning to take / took
router.get('/class', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/myclasses', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet'});
	}
});

// routes for getting generd list
router.get('/geneds', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/newpage', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet'});
	}
});





// routes for list of courses
router.get('/courses', function(req, res) {
	var user = req.session.user;
	var message = "";
	var listclasses;
	m.getCourse("CS187", function(err, data) {
		if(err) {
		        console.log('ERROR: ' + err);
	    	}
	    	else if (data === '[]'){
	        	message+="no prereq \n";
	        	console.log("blank");
		}
		else{
	        // Store the user in our in memory database.
			 listclasses = JSON.parse(data);
		message+= "hi";
		}
		console.log(listclasses);

		res.render('student/courselist', { title   : 'data',
                         	listclasses : listclasses, 
							message : "hi"});
	});
});

// routes for changing settings.
router.get('/settings', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/newpage', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet'});
	}
});

//online calls the admin list 
router.get('/online', function(req, res) {
	var user = req.session.user;
	var requser;
  	var adminlist;

	if(user === undefined){
	  requser= "unknown";
	}
	else{requser= user.id;}

	m.getAllfromTable("admins",function (err, data) {
      	if(err) {
		console.log("error in finding user \n");
      	}
      	else{
			//console.log("user data : " + data);
          	adminlist = JSON.parse(data);
			userlib.onlinelist(function(onlines) {
			    	if (onlines){
			          onlinelist = onlines;
						//console.log("user data : " + onlines);
			          res.render('student/online', { 
						title : 'Users Online',
						adminlist: adminlist,
						onlinelist : onlinelist,
						requser : requser });
	        		}
	        		
  			});
		}
	});

});





// ## main
// The main user view.
router.get('/main', function(req, res) {
  // TDR: added session support
  var user = req.session.user;
	//console.log(user.id);
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('../login');
  }
  else {
      	    res.render('student/main', { title   : 'User Main',
                               message : 'Login Successful',
                               username : user.id,
				schoolorg:user.schoolorg});
      	}
  
});

module.exports = router;