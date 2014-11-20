var pg = require('../../node_modules/pg');

var connString = 'postgres://student:student@localhost/student';

var requestUID;

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
        ', 4.0);'
        /*client.query('insert into students values (\'samfoy\', \'password\', \'Sam\', \'Fox\', \'Senior\', \'UMass Amherst\', 4.0);'*/
      , function(err, result) {
        done();
        client.end();
        if(err) {
          callback(err);
        }
        else {
          console.log('HELLO\n\n');
          callback(undefined, 'Success!\n');
        }
      });
    }
  });
}

exports.getAllStudents = getAllStudents;
exports.addNewUser = addNewUser;