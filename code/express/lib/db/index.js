var pg = require('../../node_modules/pg');

var connString = 'postgres://student:student@localhost/student';


//Returns all students in database
exports.getAllStudents = getAllStudents;

//Adds user to database
//User info specified by arguments, gpa initialized to 0.0
exports.addNewUser = addNewUser;

//Returns json for student if exists, or else returns the string '[]'
exports.getUser = getUser;


//Returns all students in database
function getAllStudents(callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query('select * from students;'
          , function (err, result) {
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
      client.query('insert into students values (\'' + id + '\', \''
        + password + '\', \''
        + fname + '\', \''
        + lname 
        + '\', \'Senior\', \'' 
        + schoolorg + '\'' +
        ', 0.0);'
        /*client.query('insert into students values (\'samfoy\', \'password\', \'Sam\', \'Fox\', \'Senior\', \'UMass Amherst\', 4.0);'*/
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
function getUser(id, callback) {
  pg.connect(connString, function (err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
      client.query('select * from students where id=\'' + id + '\';'
      , function(err, result) {
        done();
        client.end();
        if(err) {
          console.log('Error: ' + err);
          callback("err");
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