var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

// # User Server-Side Routes


// routes for getting thier profile


// routes for sending updates


// routes for retrievieng classes.


// ## main
// The main user view.
router.get('/main', function(req, res) {
  // TDR: added session support
  var user = req.session.user;
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('../login');
  }
  else {
      	if (user.isAdmin === true){
      	req.flash('auth', 'admin' );
      	res.redirect('../admin');
	}
      	else{
      	    res.render('student/main', { title   : 'User Main',
                               message : 'Login Successful',
                               username : user.username });
      	}
  }
});


//online calls the admin list 
router.get('/online', function(req, res) {
  var adminlist;
  userlib.adminlist(function(data) {
    if (data){
          adminlist = data;

	userlib.onlinelist(function(onlines) {
    	if (onlines){
          onlinelist = onlines;

          res.render('student/online', { title : 'Users Online',
                      adminlist: adminlist,
                         users : onlinelist });
        }
  });

}
});

});

module.exports = router;