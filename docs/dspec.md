#Idea Summary


#Revision History
- Changing the "Login" tab to be the main page when you access the site.

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
- The student logs in and is taken to a page where he/she sees a table showing the courses taken so far, currently, and planned to take in the future. There are also navigation tools for displaying gen ed requirements, class search, and current class schedule. This interacts with the server by pulling the appropriate data for the user that is signed in, in the form of JSON objects. Except for times of course enrollment, the student is mostly pulling data from the server and not pushing anything to the server.


login ->> admin
- The admin, on the other hand, has the power to adjust things and push data to the server and database. When an admin logs on her/she can see an entire list of courses offered and be able to make adjustments to any field, which update on the server (not dynamically, there will be a "submit changes" button). The admin can also pull and adjust student data for logging grades, fixing errors, etc. 


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
- User begins at a login page. After logging in the user is taken to the main page, at which point he/she can look at class schedules, GE requirements, degree paths, etc. Admin users will instead be taken to a page that allows them to view and update course offerings. 

- Views will be .ejs files and navigation will be organised using express. Details such as drop down menus and other DOM manipulation will be handled in JQuery. We will use AJAX for features like adding classes to your "shopping cart" which require server requests without re-rendering the page. Visualization of degree paths and class schedules will be done using D3.js.


#Challenges
- We have little experience with UI's and making it all look good could prove difficult
- AJAX requests to populate shopping cart might be a pain to figure out
- Avoiding procrastination
- Making everything extendable and dynamically updateable
- Getting data for all the courses and tracks
- How to make students and their data easy to keep track of and store
- Dividing up work evenly and making it all work together on time
- Integrate jquery with ejs 
