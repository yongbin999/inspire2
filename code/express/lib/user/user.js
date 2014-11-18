// # User Library

// ## User Objects
function User(username, password, uid,type) {
  this.username = username;
  this.password = password;
  // Added uid
  this.uid      = uid;
  this.isAdmin = (type || false);
}
var userid = 5;
var online = {};

// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 1,false),
  new User('hazel', 'lezah', 2,false),
  new User('caleb', 'belac', 3,false),
  new User('admin', 'admin', 4,true),
  new User('yong', 'yong', 5,true)
];

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
