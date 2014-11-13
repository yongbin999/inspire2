var pg = require('../../node_modules/pg');

var connString = 'postgres://student:student@localhost/student';

var requestUID;

function getAllUsers(callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query('select U.uid, U.fname, U.lname, U.password, U.age, A.city, ' +
              'A.aid, A.street, A.city, A.state, A.zipcode ' +
          'from address A, users U, lives L ' +
          'where U.uid = L.uid ' +
            'and A.aid = L.aid;'
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

exports.getAllUsers = getAllUsers;