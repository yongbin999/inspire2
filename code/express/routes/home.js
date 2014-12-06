var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');
var m = require('../lib/db');

// # User Server-Side Routes

//middleware
router.use(function (req, res, next) { 
	console.log();
  console.log('Time:', Date(Date.now()));
  next();
});




// ## login
// Provides a user login view.
router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  if (user === undefined || user === '[]'){
      res.render('frontpage/login', { title   : 'Login Page',
                          message : authmessage });
  }
  else {
	/// already logged in, so redirects them
        if (user.isadminfor !== undefined){ // need new method
          req.flash('auth', 'admin' );
          res.redirect('/admin');
        }
        else {
          res.redirect('/user/main');
        }
      }
    
});

// ## auth lookup user info the transfer into to /login again to reroute
// Performs **basic** user authentication.
router.post('/auth', function(req, res) {
  // TDR: redirect if logged inconsole.log("user data : " + data);:
  var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined) {
  	res.redirect('/login');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    var isadmin = req.body.isadmin;
    //console.log(username);

    // admin login
	if( isadmin === "true"){
	table = "admins";
	console.log(isadmin);
	}
	else{
	table = "students";	
	}

    // Perform the user lookup.
    m.getUser(username,table,function (err, data) {
      if(err) {
	console.log("error in finding user \n");
        req.flash('auth', "error in the search");
        res.redirect('/login');
      }
      else {
	console.log("user data : " + data);

	if (data === '[]'){
        console.log("cant find user \n");
        req.flash('auth', "User doesnt exit, please try again or signup for a new acct");
	}
	else{
        // Store the user in our in memory database.
	var userinfo = JSON.parse(data);
	console.log("parsed id: " + userinfo[0].id);

	if(userinfo[0].password !== password){
	req.flash('auth', "Password incorrect! Please try again");
	}
	else{
	req.session.user = userinfo[0]; // get the first one from thearray
        userlib.addonline(userinfo[0].id);
	}
	}

        // Redirect to main.
        res.redirect('/login');
      }
   });


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
    	res.render('frontpage/settings', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet'});
	}
});


// ## logout
// Deletes user info & session - then redirects to login.
router.get('/logout', function(req, res) {
  var user = req.session.user;
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }

  if (userlib.checkonline(user.id) !== undefined) {
    userlib.deleteonline(user.id);
  }

  delete req.session.user;
  req.flash('auth', 'Thanks for visiting inSpire!' );
  res.redirect('/login');
});




router.get('/signup', function(req, res) {
      	    res.render('frontpage/signup', { title   : 'Homepage',
                               message : 'Sign up for an account today!'
                               });
});

// signup new user
router.post('/signup/newuser', function(req, res) {
  
	var admintype = req.body.admintype;

    var username = req.body.username;
    var password = req.body.password;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var year = req.body.year;
	var schoolorg = req.body.schoolorg;
	var gpa = req.body.gpa;
	var track = req.body.track;
var schoolorg = req.body.schoolorg;


var user = req.session.user ||username;


    m.addNewUser(username,password,fname,lname,year,schoolorg,gpa,track, function(err, data) {
      if(err) {
        console.log('ERROR: ' + err);
      }
      else {
	req.flash('auth', 'New user created, please login with your info');
        res.redirect('/login');
      }

    }); 
  
});

// video tutorial
router.get('/info', function(req, res) {
      	    res.render('frontpage/info', { title   : 'How inSpire Works',
                               message : 'Welcome to inSpire'
                               });
 
});


// ## main
// The main user view.
router.get('/', function(req, res) {
      	    res.render('frontpage/homepage', { title   : 'Homepage',
                               message : 'Welcome to inSpire'
                               });
 
});



module.exports = router;