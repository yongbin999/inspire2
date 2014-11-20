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

exports.getAllStudents = getAllStudents;