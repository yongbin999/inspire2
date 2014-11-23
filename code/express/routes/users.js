var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

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
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/courselist', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet'});
	}
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


  	userlib.adminlist(function(data) {
    		if (data){
          	adminlist = data;

			userlib.onlinelist(function(onlines) {
			    	if (onlines){
			          onlinelist = onlines;
			
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