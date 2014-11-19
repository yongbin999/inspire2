var url = require('url');
var http = require('http');

if (process.argv.length < 3) {
  console.log('usage: node http-client.js [h|rh|json|single-user|all-users] [url]');
  process.exit(1);
}

// The handler function to invoke:
var handlerType = process.argv[2];

// The url to connect to:
var urlStr = process.argv[3] || 'http://www-edlab.cs.umass.edu/cs326/schedule/';

if (!(handlerType === 'h' || handlerType === 'rh' || handlerType === 'json' || handlerType === 'single-user' || handlerType === 'all-users')) {
  console.log('usage: node http-client.js [h|rh|json|single-user|all-users] [url]');
  process.exit(1);  
}

var url = url.parse(urlStr);

var options = {
    host: url.hostname,
    path: url.path,
    port: url.port || 80,
    method: 'GET'
  };

/**
 * A function to create a response handler.
 */
function createResponseHandler (callback) {
  /**
   * A function to handle a response.
   */
  function responseHandler(res) {
    // A variable to capture the data from the response:
    var str = '';

    // When data is received we append to string.
    res.on('data', function (chunk) {
      str += chunk;
    });

    // When the connection is closed, we invoke our callback.
    res.on('end', function () {
      callback(str);
    });
  }

  // Return the created function:
  return responseHandler;
}

// Create a basic handler:
var handler = createResponseHandler(function (data) {
  console.log(data);
});

// A slightly more interesting handler:
var re_handler = createResponseHandler(function (data) {
  var lines = data.split("\n");

  console.log('Found Links:');
  var re = /<a +href="([^"]+)".*>/; // <a href="URL">link text</a>
  lines.forEach(function (line) {
    var match = re.exec(line);

    if (match !== null) {
      console.log(match[1]);
    }
  });
});

// Even more interesting:
var json_handler = createResponseHandler(function (data) {
  var obj = JSON.parse(data);
  console.log(obj);
});

var single_user_handler = createResponseHandler(function (data) {
  //Split out the values
  if(data === 'No user found' || data === 'Unknown url path') {
    console.log('\n' + data);
    console.log('Please include valid uid number as url path\n');
  }
  else {
    console.log('\n');
    var elements = data.split(',');
    var outputString = ""; //String that will be outputted to the console
    var uid = elements[0].substring(7, elements[0].length);
    outputString += "UID: " + uid + "\n";
    //Append first name
    var fname = elements[1].substring(9, elements[1].length-1);
    outputString += "First Name: " + fname + "\n";
    //Append last name
    var lname = elements[2].substring(9, elements[2].length-1);
    outputString += "Last Name: " + lname + "\n";
    //Append password
    var password = elements[3].substring(12, elements[3].length-1);
    outputString += "Password: " + password + "\n";
    //Append age
    var age = elements[4].substring(6, elements[4].length);
    outputString += "Age: " + age + "\n";
    //Append city
    var city = elements[5].substring(8, elements[5].length-1);
    outputString += "City: " + city + "\n";
    //Append AID
    var aid = elements[6].substring(6, elements[6].length);
    outputString += "AID: " + aid + "\n";
    //Append street
    var street = elements[7].substring(10, elements[7].length-1);
    outputString += "Street: " + street + "\n";
    //Append state
    var state = elements[8].substring(9, elements[8].length-1);
    outputString += "State: " + state + "\n";
    console.log(outputString);
  }
});

//Added handler for returning all user data
var all_users_handler = createResponseHandler(function (data) {
  console.log(data);
});

console.log(' --> connecting to ' + options.host + ' on port ' + options.port);
console.log(' --> resource ' + options.path);

switch (handlerType) {
  case 'h':
    var req = http.request(options, handler);
    req.end();
    break;
  case 'rh':
    var req = http.request(options, re_handler);
    req.end();
    break;
  case 'json':
    var req = http.request(options, json_handler);
    req.end();
    break;
  case 'single-user':
    var req = http.request(options, single_user_handler);
    req.end()
    break;
  case 'all-users':
    var req = http.request(options, all_users_handler);
    req.end();
    break;  
  default:
    console.log('unknown handler type');
}

