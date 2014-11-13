var http = require('http');
var url  = require('url');
var m = require('./db');
var userData; //Stores all user data in one string
var users; //Array that stores each user's data separately


function textHandler(request, response) {
  console.log('received a request from ' + request.headers.host);
  console.log('resource requested: ' + request.url);
  
  response.writeHead(200, { 'Content-Type' : 'text/plain' });

  response.write('hello: ' + request.headers.host + '\n');
  response.write('  --> you requested ' + request.url);
  response.end();
}

function jsonHandler(request, response) {
  response.writeHead(200, { 'Content-Type' : 'text/json' });

  var obj = {
    host: request.headers.host,
    url : request.url
  };

  json = JSON.stringify(obj);
  response.write(json);
  response.end();
}

function usersHandler(request, response) {
  console.log('recieved a request\n');
  response.writeHead(200, { 'Content-Type' : 'text/json' });
  //Extract the uid from request url
  var theuid = parseInt(request.url.substring(1, request.url.length));
  //If no id specified, send all of the data
  if(isNaN(theuid)) {
    //If there was just some bogus url path...
    //...let the client know
    if(request.url.length > 1) {
      response.write('Unknown url path');
    }
    //Or else assume the client wants all user data
    //(that's what no url path at all means)
    else {
      response.write(userData);
    }
  }
  //If there is an id specified, return data for only the respective user
  else {
    //But wait, if there is no data at that index, let the client know...
    if(theuid > users.length || theuid < 1) {
      response.write('No user found');
    }
    //Congratulations, you made it...
    //...now you may receive user data
    else {
      response.write(users[theuid-1]);
    }
  }
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

if (process.argv.length < 3) {
  console.log('usage: node http-server.js [text|json|users]');
  process.exit(1);
}

var handlerType = process.argv[2];
if (!(handlerType === 'text' || handlerType === 'json' || handlerType === 'users')) {
  console.log('usage: node http-server.js [text|json|users]');
  process.exit(1);  
}

var server = null;

switch (handlerType) {
  case 'text':
    server = http.createServer(textHandler);
    break;
  case 'json':
    server = http.createServer(jsonHandler);
    break;
  case 'users':
    server = http.createServer(usersHandler);
    m.getAllUsers(cacheTheData);
    break;
  default:
    throw new Error('invalid handler type!');
}

server.listen(4000);
console.log('Server is listening!');