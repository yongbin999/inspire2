var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');
var m = require('../lib/db');

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
  if (user === undefined){
    req.flash('auth', 'not log in yet' );
      res.render('frontpage/login', { title   : 'Login Page',
                          message : authmessage });

  }
  else {
    m.userExists(user.username, function (err, data) {
      if(err) {
        req.flash('auth', "error");
      }
      else {
        if (user.isAdmin === true){
          req.flash('auth', 'admin' );
          res.redirect('/admin');
        }
        else {
          res.redirect('/user/main');
        }
      }
    });
  }
});


// ## auth
// Performs **basic** user authentication.
router.post('/auth', function(req, res) {
  // TDR: redirect if logged in:
  var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined) {
  
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.

    m.userExists(username,function (err, data) {
      if(err) {
        console.log("SDFGHJK3(*&#^$HGKFJSHGDKJHFS78O\n");
        req.flash('auth', "error");
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

// not sure how does thus work??
  }

  delete req.session.user;
  res.redirect('/login');
});


router.get('/signup', function(req, res) {
      	    res.render('frontpage/signup', { title   : 'Homepage',
                               message : 'Sign up for an account today!'
                               });
});


// signup new user
router.post('/signup/newuser', function(req, res) {
  
    var username = req.body.username;
    var password = req.body.password;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var admintype = req.body.admintype;
    var schoolorg = req.body.schoolorg;

var user = req.session.user ||username;

    // Perform the user lookup. now its add
    /*userlib.adduser(username, password, admintype, function(error, user) {
      if(error){
        res.render('frontpage/signup', { title   : 'Check your inputs again',
                              users : user, 
                              message :  error});
      }
      else{
      	req.flash('auth', 'Thank You! Your account ' + username + 
			' had been created! Please login with your info');
    	res.redirect('/login');
      }

      });*/

    m.addNewUser(username, password, fname, lname, false, schoolorg, function(err, data) {
      if(err) {
        console.log('ERROR: ' + err);
      }
      else {

        res.redirect('/login');
      }

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