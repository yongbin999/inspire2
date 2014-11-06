#Idea Summary


#Revision History
 - Changing the "Login" tab to be main page when you access the site.

#External Libraries Used
- Express.js to organize the routes and views
- postgres.js to access the SQL database
- D3 to model the course list views
- JQuery to manipulate the DOM
- AJAX for dynamic page manipulation 
- morgan for user login functionality

#Birds-eye View

Login Page
* If a User enters username/password and logs in:
	* Routed to user main page
		* Depending on what is selected, user can then be routed to 'Track My Courses', 'Track My Gen Ed Courses', 'My Schedule', 'Computer Science Course List', 'Settings', or 'Log out'(routes back to login page)

* If an admin enters username/password and logs in:
	* Routed to admin page
		* Depending on what is selected, admin can then be routed to 'Create user', 'CS courses', or 'Log out'(routes back to login page)


#Components

database: 

- Functionality: store students' information (username, password, student ID, course history), existing classes' information (prerequisites, term, instructor). Only admins can modify content of the database (add/remove classes, create users). 
- Implementation: javascript module that includes methods to access the database:
+ add/remove/customized search user;
+ add/remove/customized search classes;


server routes

client views


#Challenges
<<<<<<< HEAD



=======
- We have little experience with UI's and making it all look good could prove difficult
- AJAX requests to populate shopping cart might be a pain to figure out
- Avoiding procrastination
- Making everything extendable and dynamically updateable
- Getting data for all the courses and tracks
- How to make students and their data easy to keep track of and store
- Dividing up work evenly and making it all work together on time
>>>>>>> ee6a73f3f87746ad8d7f77c24776ea9fdcd4fb1d
