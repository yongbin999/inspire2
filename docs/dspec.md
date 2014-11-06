#Idea Summary


#Revision History


#External Libraries Used
- Express.js to organize the routes and views
- postgres.js to access the SQL database
- D3 to model the course list views
- JQuery to manipulate the DOM
- AJAX for dynamic page manipulation 
- morgan for user login functionality

#Birds-eye View

details of how it works
login ->> main


login ->> admin


#Components

database: 

- Functionality: store students' information (username, password, student ID, course history), existing classes' information (prerequisites, term, instructor). Only admins can modify content of the database (add/remove classes, create users). 
- Implementation: javascript module that includes methods to access the database:
+ add/remove/customized search user;
+ add/remove/customized search classes;

server routes
- Functionality: connect pages. It specifies the rendered view for each route and direct it to other routes when certain events are triggered by the users or admins.  
- Implementation: 
+ login: route to either user main or admin main depending on which account is logging in. 
+ user main: route to pages and actions available to the user: calendar, course list, logout.
+ admin main: route to pages and actions available to the admin: modify the database, view courses.

client views

#Challenges



