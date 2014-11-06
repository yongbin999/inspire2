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

database

server routes

client views
- User begins at a login page. After logging in the user is taken to the main page, at which point he/she can look at class schedules, GE requirements, degree paths, etc. Admin users will instead be taken to a page that allows them to view and update course offerings. 

- Views will be .ejs files and navigation will be organised using express. Details such as drop down menus and other DOM manipulation will be handled in JQuery. We will use AJAX for features like adding classes to your "shopping cart" which require server requests without re-rendering the page. Visualization of degree paths and class schedules will be done using D3.js.

#Challenges