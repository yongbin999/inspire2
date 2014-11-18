var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

// A logged in "database":
var online = userlib.online;

// # User Server-Side Routes

// ## main
// The main user view.
router.get('/', function(req, res) {

var user = req.session.user;

  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
	else if (user.isAdmin === true){
    	res.render('schooladmin/admin', { title   : 'admin page',
                         	users : user, 
				message : 'admins route'});
	}

	});


// create new user

router.post('/newuser', function(req, res) {
  var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined && user.isAdmin === true) {
    var username = req.body.username;
    var password = req.body.password;
    var admintype = req.body.admintype;
    // Perform the user lookup. now its add
    userlib.adduser(username, password, admintype, function(error, user) {
	   
      if(error){
        res.render('schooladmin/admin', { title   : 'Admin page',
                              users : user, 
                              message :  error});
      }
      else{
      res.render('schooladmin/admin', { title   : 'Admin page',
                              users : user, 
                              message : 'User ' +username + ' user created! ' +
                              'logout and relogin with the new login info.'});
      }
      });
  }
  else{
	req.flash('auth', 'You are not admin!');
    	res.redirect('/user/main');
  }
  
  
});




router.get('/online', function(req, res) {
  res.redirect('/user/online');
});

module.exports = router;