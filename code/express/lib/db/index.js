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

//Adds new course to coursecatalog
exports.addNewCourse = addNewCourse;

//Returns course specified by courseid
exports.getCourse = getCourse;

//Sets prereqid as a prerequisite for the course specified by courseid
exports.addNewPrereq = addNewPrereq;

//Returns prerequisites for classes specified by classid
exports.getPrereqs = getPrereqs;



//Populates the course catalog based on csv data
function populateCoursesAndPrereqs(callback) {
  //Read in csv file...
  fs.readFile('./lib/db/Courses.csv', 'utf8', function(err, data) {
    if(err) {
      return console.log(err);
      response.end();
    }
    else {
      //If success, connect to database...
          //If success, process csv data and post to database...
          var entries = data.split("\n");
          var counter = entries.length;

          /*addNewCourse("sdkj", "sdfgdsgdf", "3", "Fall", "poop", "", 
              function(err, data) {
                if(err) {
                  console.log("COURSE ADD ERROR: " + err);
                }
                else {
                  console.log("New entry added to database\n");
                }
              });*/


          for(var i in entries) {
            counter--; 
            var values = entries[i].split(",");

            var coursenumber = values[0];
            var name = values[1];
            var credits = values[2];
            var prereqs = values[3];
            var term = values[4];
            var instructor = values[5];
 
            addNewCourse(coursenumber, name, credits, term, instructor, prereqs, 
              function(err, data) {
                if(err) {
                  console.log("COURSE ADD ERROR: " + err);
                }
                else {
                  console.log("New course from csv added");
                }
              }, counter); 
        
          }
    }
  });
}

//Returns all data from a table in database
function getAllfromTable(table,callback) {
  var querystring='';
  if(table === undefined || table === 'coursecatalog'){
  querystring ='select * from coursecatalog;' ;
  }
  else if(table === 'students'){
  querystring ='select * from students;' ;
  }
  else if(table === 'admins'){
  querystring ='select * from admins;' ;
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
          console.log(data);
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
  if (table === 'students'){
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




//Adds new course to coursecatalog
//NOTE: if multiple prereqs, list them in one string separated by a space
function addNewCourse(coursenum, name, credits, term, instructor, prereqs, callback, counter) {
  pg.connect(connString, function(err, client, done) {
    if(err) {
      callback(err);
    }
    else {
      if(isNaN(credits) || isNaN(parseInt(credits))) {
        callback("Non-number entered for credits", undefined);
      }

      //Add New Course information
      else {
        var querystring = 'insert into coursecatalog values (\'' 
          + coursenum + '\', \''
          + name + '\', \''
          + credits + '\', \''
          + term + '\', \''
          + instructor + '\');';
        //console.log(querystring + "\n");
        client.query(querystring, function(err, result) {
          done();
          //client.end();
          if(err) {
            callback(err);
          }
          else {
            if(counter <= 0) {
		setTimeout(function(){ 
			client.end();
              		console.log("Load courses from csv completed!!\n");
			}, 2000);
            }
            callback(undefined, 'Success!\n');
          } 
        });
      }
    }
  });
}



//Returns course specified by courseid
function getCourse(courseid, callback) {
  var querystring ='';
  if (courseid ==="all"){
    querystring = 'select * from coursecatalog ;';
  }
  else{
    querystring = 'select * from coursecatalog where coursenumber =\'' + courseid + '\';';
  }

    pg.connect(connString, function(err, client, done) {
    if(err) {
      callback(err);
    }
    else {
      client.query(querystring, function(err, result) {
          done();
          client.end();
          if(err) {
            console.log(err);
          }
          else {
            //NOTE: returns '[]' if coursenumber does not exist
            var data = JSON.stringify(result.rows);
            callback(undefined, data);
          }
        });
    }
  });
}




//Sets prereqid as a prerequisite for the course specified by courseid
function addNewPrereq(courseid, prereqid, callback) {
  pg.connect(connString, function(err, client, done) {
    if(err) {
      callback(err);
    }
    else {
      //TODO: create querystring
      var querystring = 'insert into prerequisites values (\'' + courseid + '\', \'' + prereqid + '\');';

      client.query(querystring
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




//Returns prerequisites for classes specified by classid
function getPrereqs(classid, callback) {
  pg.connect(connString, function(err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
      client.query('select prereq from prerequisites where coursenumber =\'' + classid + '\';'
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
            //console.log(data);
            callback(undefined, data);
          }
        });
    }
  });
}