var http = require('http');
var url  = require('url');
var m = require('./db');
var userData;
var users;

function usersHandler(request, response) {
  console.log('recieved a request\n');
  response.writeHead(200, { 'Content-Type' : 'text/json' });
  response.write('Got your request!\n');
  response.end();
}

//Used as a callback for testing purposes
function printStuff(err, data) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(data);
  }
}

//Callback for the getAllUsers module function
function cacheTheData(err, data) {
  if(err) {
    console.log(err);
  }
  else {
    //Set global variable to the data returned from module
    userData = data;
    //Split out each user's data into array elements
    users=userData.split('},');
    //A couple little fix-ups to make all of the strings uniform...
    users[0] = users[0].substring(1, users[0].length);
    users[users.length-1].substring(0, users[users.length-1].length-1);
    for(var i=0; i<users.length-1; i++) {
      users[i] += '}';
    }
  }
}

if (process.argv.length < 2) {
  console.log('usage: node inspire-server.js');
  process.exit(1);
}

var server = http.createServer(usersHandler);
m.getAllUsers(printStuff);


server.listen(4000);
console.log('Server is listening!');