// # User Library

var userid = 5; //default should update
var online = {};


// ## User Objects
function User(username, password, uid,type) {
  this.username = username;
  this.password = password;
  // Added uid
  this.uid      = uid;
  this.isAdmin = (type || false);
}

// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 1,false),
  new User('hazel', 'lezah', 2,false),
  new User('caleb', 'belac', 3,false),
  new User('admin', 'admin', 4,true),
  new User('yong', 'yong', 5,true)
];

exports.addonline = function(username) {
  var len = online.length;
  online[username.id] = username;

}
exports.checkonline = function(username) {
  var existed = false;
      for(var id in online){
        if (online[id].username === username){
          existed = true;
	return username;
        }
      }
	return undefined;
}


// need to add user to the db temp
exports.adduser = function(username, password, admintype, cb) {
      //check if user exists
      var existed = false;
      for(var id in userdb){
        if (userdb[id].username === username){
          existed = true;
        }
      }

      
      //add user if not exist
      if(existed === false){
         userid ++;
         if(admintype === "true"){
         userdb[userid-1] = new User( username, password, userid, true);
          }
          else{
          userdb[userid-1] = new User( username, password, userid, false);
          }

         cb(undefined,userdb[userid-1]);
       }
       else{
        cb('user already existed');
       }

}


//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
}

exports.useronline = function(username, cb) {
  var len = online.length;
  for (var i = 0; i < len; i++) {
    var u = online[i];
    if (u.username === username) {
        cb(undefined, u);
      return;
    }
  }
  cb('user not online');
}


exports.onlinelist = function(cb){
  var onlinelist= {};
  var id = 0;
  for(var userid in online) {
               onlinelist[id] = online[userid];
               id++;
    }
    cb(onlinelist);
}

exports.adminlist = function(cb){
  var adminlist= {};
  var id = 0;
  for(var userid in userdb) {
      if (userdb[userid].isAdmin === true){
               adminlist[id] = userdb[userid];
               id++;
      }
    }
    cb(adminlist);
}
