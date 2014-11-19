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
server.listen(3000);
console.log('Server is listening!');