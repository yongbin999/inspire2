var http = require('http');
var url  = require('url');
var m = require('./db');

function handler(request, response) {
  console.log('recieved a request');

  //Extract the filepath
  var path = url.parse(request.url).pathname;

  response.writeHead(200, { 'Content-Type' : 'text/json' });
  response.write('Got your request!\n');

  //Return all students
  if(path === '/students/all') {
    m.getAllStudents(function(err, data) {
      if(err) {
        console.log('ERROR: ' + err);
      }
      else {
        response.write(data);
      }
      response.end();
    });
  }

  //Add a new user
  else if(path === '/signup/newuser') {
    m.addNewUser('person', 'password', 'bob', 'smith', false, 'UMass Amherst', function(err, data) {
      if(err) {
        console.log('ERROR: ' + err);
      }
      else {
        response.write(data);
      }
      response.end();
    });
  }

  //Query for a specific user
  else if(path === '/getuser') {
    m.getUser('khanhnguyen', function(err, data) {
      if(err) {
        console.log('Error: ' + err);
        response.write('Error: ' + err);
      }
      else {
        if(data === '[]') {
          console.log('User not found');
        }
        else {
          console.log('User found:\n' + data + '\n');
        }
        response.write(data);
      }
      response.end();
    });
  }
   else {
    console.log('unknown filepath: ' + path + '\n');
    response.write('unknown filepath: ' + path + '\n');
    response.end();
   }
}

//callback for testing purposes
function printStuff(err, data) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(data);
  }
}

var server = http.createServer(handler);
server.listen(4000);
console.log('Server is listening!');