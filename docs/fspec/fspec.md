# inSPIRE 
<img src ="../inspire logo.jpg" width =30% align ="middle"> 
###### 'A Trail For Success'


## Meet the Team

+ Yong's role in the team will be facilitate the progress of the releases cycles. He also will be looking into the database design and intergration with the server host.

+ Sam will be conducting the user research from both the student perspective and the administrator perspective. This process involves iterations of UX Design, prototyping, and user testing. The goal here is to solidify our idea and make sure our features are validated. In addition to that he will be part of the team that designs and implements the cloud code in the way it processes and transfers data from the server to the client. 

+ Alex is going to be doing the server side programming. He will optimize the server such that it runs quickly and efficiently. There will be no bugs and no way to hack in once he is finished.

+ Andrew will be most concerned with front-end work and the interface. The goal is to have a very easy to use and visually satisfying program that cooperates well with the back-end and database. 

+ Khanh's role will be to come up with our data modelling algorithm and database structure. He will be in charge of the way our data looks when being queried.
He will help with designing programs, factoring and testing code. He will also help with debugging errors. His main focus is to make the app run more efficiently in term of both memory and time. Another goal is to revise code style to strengthen the maintainability aspect of the app.   

+ Josh's role will be maintaining the back-end designs, intergrration of the server/client, and database setup.

## Overview

###### Core product
+	Our main product is a class timeline application, where students can select and display classes needed to complete their degrees.
+	With this front end production, we can also help the school/department admins modify classes' pre-reqs relationships. The admins would easily get an instant summary of student plans, which can help schedule ahead assignments of professors and classrooms. 

###### Social media 
+	In addition to the timeline, we'd like to add a social media aspect to the application, where students can publish their class histories and plans on other websites, or as a link from their resumes.
+	Other social media functionalities we'd like to implement are student experiences and comments on the path of classes they took. They will be rated/ranked and made available to other students. This will be useful for new students to read, since it offers a service similar to getting advices from a former student, which is inaccessible for most new students. 

###### Services
+	From our site, 3rd party companies and employers can submit requests (fee) for student qualification verification to the school admins. This will be noted in the terms of service that anyone will have an option to verify accuracy of the student profile.
+	On the other hand, students can choose to self-verify(fee). This will produce an archive their profile on our website, which functions as a "transcript". It will be useful for any type of jobs, internships, research, even college applications.


##Scenarios 
===============

1. Joe is a computer science major at UMass Amherst and he has been so busy that he forgot to register for courses for the next semester. Unless he does it quickly before more people register, he won't be able to get a spot! He doesn't need to worry anymore, since, thanks to the new inSPIRE, he can quickly compare the list of courses on its website. From his basket of todo classes from his previous planning session, he can see details such as eligiblity, and highlighted classes that he must to take in order to complete his track. Being able to see all of these info on one convenient page saves Joe time and helps him get in class before those pesky freshman get a chance to register.

2. It’s August and the new semester is right around the corner. The computer science department has decided to add a few new course offerings this year, and also to update a couple of prerequisites and requirement fulfillments that pertain to a couple existing classes. Bob is a UMass administrator in charge of updating this data on on the inSPIRE database. With ease he logs into the website, enters his authentication information, and pulls up a spreadsheet-like window displaying course information in a table. He locates CMPSCI326, scrolls over to the “prerequisites” column, and adds CMPSCI220 as a listed prerequisite. He then finds CMPSCI250, and adds that it now fulfills the G requirement, because it is clearly a class that promotes awareness of global diversity. Finally, to add a new course he clicks on the plus icon and fills out all of the relevant information for the new course CMPSCI999. By clicking "done", this item is painlessly added to the database. His job is done in 5 minutes, and he can go home and take it easy. 

3. Jane is attempting to planning for courses that she needs to take next semester in order to graduate on time, but she is getting so frustrated while using Spire! The problem Spire is each course has an individual page, and you dont know the pre-reqs without tediously opening each individual page and constantly hitting the back button. By using  ones she is qualified given her completed pre-requisites.  Fortunately thanks to inSPIRE she can see which courses she qualifies to take next and selects her classes from the recommanded list.

4. Cory and Derek are both general Computer Science majors. They are chatting about the requirements they need to fulfill the major. Derek tells Cory that they need to take 9 credits at the 400 level, or higher. Cory doesn't know any classes above the 400 level. He logs on to inSPIRE and goes to his requirements where it lists all the options for the 400+ level courses. He clicks on each of the classes, and a description comes up. The description tells him who teaches the class and provides a summary of the class. This helps Cory pick out 3 courses, and he's ready to cross these requirements off his list.

5. Richard is a Umass alumni and been working as a Project Manager at NASA. He is looking to hire another Umass alumn to work on a secreat space exploration project. He went to inSpire, filter by Umass and then by anyone taken the CS600-Advance Algorithms course. From this list, and he found 5 seniors that will be graduating this year. He sends each a private message and schedules an interview with them. 

6.  Tim is entering the spring semester of his Junior year, and is choosing his sub-plan to either Software Engineering or Security and Privacy. He enjoys both equally. Tim has taken Algorithms, Operating Systems, Sofware Engineering, and Web Programming.  Using inSPIRE's easy to read interface, he sees that all of these classes fulfilled the Software Engineering track, while only three are fulfilled with Security and Privacy.  Looking deeper into his course track, Tim notices Advanced Software Enigineering are offered this semester and fit into his schedule, while Advance Security Analysis only avilable in the fall semester. Rather delaying a semester, Tim decides that the Software Engineering track is the best for him.

7. Melinda is a campus recruiter at Google. She comes across an application for a summer internship in her database and is mildly interested in hiring this student George, but she would like to know more about his academic background. Since inSPIRE is so awesome and has been universally adopted as the standard student administration system, she went to George's inSpire link/QR code to see his course history. Reading the details of the course descriptions, Melinda has a good idea about his core knowledge from classes. George also filled out his optional bio section and attached links to his impressive personal webpage. Melinda said to herself, "He’s halfway hired!".

8. Jean is entering her last semester at school and she still needs 2 computer science electives that she needs to take, but she has no idea what courses would be more interesting to learn. She saw a CS500 class avilable to signup. While looking through the reviews and thoughts from other students who had previously taken the course, she decides this class won't help her careerpath. She continues searching for classes and reading students reviews, and finally found her ideal 2 elective classes.


Non-Goals
=========

**High levels of Security** - This application is meant as an easy-to-use reference for courses, and a username and password are used only to help users easily access their data.  Therefore, no large security implementation will be used.

**Implementing every major** - Implementing every major would take a lot of time and would just be repeating the basic implementation we are demonstrating.

**Making ratemyprofessor.com 2.0** - We will have a course rating and review implemented but we will not be making a professor rating system since it has already been done, professors change for courses, and we don't want to end up in any hot water.

Open Issues
===========

- Web hosting companies are concerned that it will generate too much traffic and they won't be able to handle it
- Data mining of gen ed courses could be a real pain
- Making the UI look pretty 


Preliminary User Interface
==========================

<img src ="./flowchart.png" align="middle" height="400px" width="800px">

The flowchart above shows how the site is structured. The main page has multiple tabs, some of which are dropdown menus. The chart is color coded and differentiated by shapes, as denoted on the right.

x
<img src ="./login.png" align ="middle" height="600px" width="800px"> 

The login page is that page that the admin and user/employers will see when they go to log on. They will input their username and password and be redirected back if they fail to login. Otherwise they will be redirected to the mainpage with their specialized views.

<img src ="./mainpage.png" align ="middle" height="400px" width="800px"> 

The main page is the default page that all users will see. Once student logs on, they will be able to go to their classes, see their gen ed requirements, view a course database, and log out. It will also display the courses they have previously taken, which ones they are taken, and have a quick and easy way to look for new courses.

<img src ="./admin_main_page.png" align ="middle" height="400px" width="800px">

The administrator overview page will be a way for an administrator to visualize what's in the database, and make additions and adjustments to course relationships as needed. 

<img src ="./course_enrollment.png" align ="middle" height="400px" width="800px">

The course enrollment page is a live portal that can be accessed during course enrollment time. It has the functionality to show scheduled courses, add different courses to a dynamic watchlist on the fly, and suggest courses based on missing geneds, prereqs, interests, etc. The search bar brings up courses in an easy pull-down bar, and lets you add or enroll in those courses without having to navigate away from the page. 

<img src ="./calander.png" align="middle" height="800px" width="1000px">

The calendar is a page that the user can use to view and interact with their schedule.  The user can add information to the calander, such as club meetings, and gen ed classes.

