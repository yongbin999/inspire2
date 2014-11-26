var pg = require('../../node_modules/pg');
var fs = require('fs');

var connString = 'postgres://student:student@localhost/student';


//Populates the course catalog based on csv data
exports.populateCoursesAndPrereqs = populateCoursesAndPrereqs;

//Returns all students in database
exports.getAllfromTable = getAllfromTable;

//Adds user to database
//User info specified by arguments, gpa initialized to 0.0
exports.addNewUser = addNewUser;

//Returns json for student if exists, or else returns the string '[]'
exports.getUser = getUser;

//Returns prerequisites for classes specified by classid
exports.getPrereqs = getPrereqs;





//Populates the course catalog based on csv data
function populateCoursesAndPrereqs(callback) {
  //Read in csv file...
  fs.readFile('./db/Courses.csv', 'utf8', function(err, data) {
    if(err) {
      return console.log(err);
      response.end();
    }
    else {
      //If success, connect to database
      pg.connect(connString, function(err, client, done) {
        if(err) {
          callback(err);
        }
        else {
          //If success, process csv data and post to database
          var entries = data.split("\n");
          for(var i in entries) {
            console.log(entries[i]);
            var values = entries[i].split(",");
            for(var j in values) {
              console.log(values[j]);
            }

            console.log("\n\n");
          }
        }
      });
    }
  });
}

//Returns all data from a table in database
function getAllfromTable(table,callback) {
  var querystring='';
  if(table === undefined){
  querystring ='select * from students;' ;
  }

  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query(querystring, function (err, result) {
        done();
        client.end();
        if (err) {
          callback(err);
        }
        else {
          var data = JSON.stringify(result.rows);
          callback(undefined, data);
        }
      });
    }
  });
}

//Adds user to database
//User info specified by arguments, gpa initialized to 0.0
function addNewUser(id, password, fname, lname, admin, schoolorg, callback) {
  pg.connect(connString, function (err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
      client.query('insert into students values (\' ' + id + ' \', \''
        + password + '\', \''
        + fname + '\', \''
        + lname 
        + '\', \'Senior\', \'' 
        + schoolorg + '\'' +
        ', 0.0);'
      , function(err, result) {
        done();
        client.end();
        if(err) {
          callback(err);
        }
        else {
          callback(undefined, 'Success!\n');
        }
      });
    }
  });
}

//Returns json for student if exists, or else returns the string '[]'
function getUser(id, table, callback) {
  var querystring = '';
  if (table === "students"){
  querystring = 'select * from students where id=\'' + id + '\';' ;
  }
  else{
  querystring = 'select * from admins where id=\'' + id + '\';' ;
  }

  pg.connect(connString, function (err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
        client.query(querystring, function(err, result) {
        done();
        client.end();
        if(err) {
          console.log('Error: ' + err);
          callback(err);
        }
        else {
          //NOTE: returns '[]' if user does not exist
          var data = JSON.stringify(result.rows);
          callback(undefined, data);
        }
      });
    }
  });
}

//Returns prerequisites for classes specified by classid
function getPrereqs(classid, callback) {
  pg.connect(connString, function(err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
      client.query('select prereq from prerequisites where coursenumber=\'' + classid + '\';'
        , function(err, result) {
          done();
          client.end();
          if(err) {
            console.log(err);
            callback(err);
          }
          else {
            //NOTE: returns '[]' if coursenumber does not exist or if no prereqs
            var data = JSON.stringify(result.rows);
            callback(undefined, data);
          }
        });
    }
  });
}