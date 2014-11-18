var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

// # User Server-Side Routes

// ## login
// Provides a user login view.
router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  // TDR: If the user is already logged in - we redirect to the
  // main application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (user !== undefined && userlib.checkonline(user.username) !== undefined) {
	if (user.isAdmin === true){
      	req.flash('auth', 'admin' );
      	res.redirect('/admin');
      	}
    res.redirect('/user/main');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login', { title   : 'Login Page',
                          message : authmessage });
  }
});

// ## auth
// Performs **basic** user authentication.
router.post('/auth', function(req, res) {
  // TDR: redirect if logged in:
  var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined && userlib.checkonline(user.username) !== undefined) {
	if (user.isAdmin === true){
      	req.flash('auth', 'admin' );
      	res.redirect('/admin');
      	}
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    userlib.lookup(username, password, function(error, user) {
      if (error) {
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        req.flash('auth', error);
        res.redirect('/login');
      }
      else {
        req.session.user = user;
        // Store the user in our in memory database.
        userlib.addonline(user);
        // Redirect to main.
        res.redirect('/user/main');
      }
    });
  }
});


// ## logout
// Deletes user info & session - then redirects to login.
router.get('/logout', function(req, res) {
  var user = req.session.user;
  if (user === undefined || userlib.checkonline(user.username) === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
    return;
  }

  if (userlib.checkonline(user.username) !== undefined) {
    //delete userlib.online[user.uid];
  }

  delete req.session.user;
  res.redirect('/login');
});

// ## main
// The main user view.
router.get('/', function(req, res) {
      	    res.render('homepage', { title   : 'Homepage',
                               message : 'Welcome to inSpire'
                               });
 
});



module.exports = router;