var pg = require('pg');
var http = require('http');
var url  = require('url');

var connString = 'postgres://student:student@localhost/student';


function print(err, rows) {
	var objarray = [];
    rows.forEach(function (line) {
      objarray.push(line);
    });
  return console.log(objarray);
}


function printUser(callback,uid) {
	//option in the query for 1 user orblank for all
	var quertstr;
	if(uid == undefined){
		querystr = 'select U.fname, U.lname, A.street, A.city  \
				from address A, users U, lives L \
				  where U.uid = L.uid \
				  and A.aid = L.aid \
				  ';
	}
	else{
		querystr = 'select U.fname, U.lname, A.street, A.city  \
				from address A, users U, lives L \
				  where U.uid = L.uid \
				  and A.aid = L.aid \
				  and U.uid ='+uid;
	}
	

  pg.connect(connString, function (err, client, done) {
  if (err) {
  	console.log("enter uid in (,)");
  }
  else {
  			client.query(querystr,function(err,result)
  			{
          		// Ends the "transaction":
	          done();
	          	// Disconnects from the database:
	          client.end();
	          if (err) {
	          	console.log("enter uid in (0,)");
	          }
				else {

					var objarray = [];
            		result.rows.forEach(function (line) {
              		objarray.push(line);
              		});
              		console.log( "location 2")

					function end(response) {
                  	response.writeHead(200, { 'Content-Type' : 'text/json' });
                  	var data = JSON.stringify(objarray);
                    console.log(data);
                    response.write(data);
                    response.end();
                	}


				callback(end);
	            }
  			});
  		}
	});
}
 
exports.connString = connString;

exports.print=print;
//exports.printUserall=printUserall;
exports.printUser=printUser;
