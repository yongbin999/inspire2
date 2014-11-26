var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

// A logged in "database":
var online = userlib.online;

// # User Server-Side Routes

var multer = require('multer');
router.post('/upload', function (req, res) {
  res.send('Uploaded ' + req.files.filedata.originalname + '\n');
});





// ## main
// The main user view.
router.get('/', function(req, res) {

var user = req.session.user;

  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('../login');
  }
	else if (user.isadminfor !== undefined){
    	res.render('schooladmin/admin', { title   : 'admin page',
                         	user : user, 
				message : 'admins route'});
	}

	});


router.post('/newgroup', function(req, res) {
  
    var groupname = req.body.groupname;
    var parentgroup = req.body.parentgroup;
var user = req.session.user ||username;

        res.render('schooladmin/admin', { title   : 'not implemented yet',
                              user : user, 
                              message :  'error or not setup yet'});
      
});






router.get('/online', function(req, res) {
  res.redirect('/user/online');
});

module.exports = router;