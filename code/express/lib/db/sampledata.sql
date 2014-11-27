
insert into admins values ('timrichards', 'password', 'Tim', 'Richards', 'UMass Amherst');
insert into admins values ('rodgrupen', 'password', 'Rod', 'Grupen', 'UMass Amherst');
insert into admins values ('admin', 'admin', 'admin', 'admin', 'UMass Amherst');

insert into students values ('test', 'password', 'test', 'test', 'Senior', 'UMass Amherst', 4.0);
insert into students values ('samfox', 'password', 'Sam', 'Fox', 'Senior', 'UMass Amherst', 4.0);
insert into students values ('yongliang', 'password', 'Yong', 'Liang', 'Junior','UMass Amherst', 4.0);
insert into students values ('alexrevello', 'password', 'Alex', 'Revello', 'Sophomore', 'UMass Amherst', 4.0);
insert into students values ('joshbearor', 'password', 'Josh', 'Bearor', 'Freshman', 'UMass Amherst', 4.0);
insert into students values ('drewmarchetti', 'password', 'Drew', 'Marchetti', 'Senior', 'UMass Amherst', 4.0);
insert into students values ('khanhnguyen', 'password', 'Khanh', 'Nguyen', 'Freshman', 'UMass Amherst', 4.0);

insert into coursecatalog values (105, 'Computer Literacy', 3, 'Fall/Spring/Summer', 'Smith');
insert into coursecatalog values (119, 'Introduction to Programming', 3, 'Fall/Spring', 'Smith');	
insert into coursecatalog values (121, 'Introduction to Problem Solving With Computers', 4, 'Fall/Spring', 'Smith');
insert into coursecatalog values (187, 'Programming with Data Structures', 4, 'Fall/Spring', 'Smith');

/*insert into prerequisites values (187, 105);
insert into prerequisites values (187, 119);*/

/*insert into offeredcourses values (2014, 'Fall', 105, 200, 150, 'Verts');
insert into offeredcourses values (2014, 'Fall', 119, 120, 91, 'Verts');
insert into offeredcourses values (2014, 'Fall', 121, 165, 165, 'Anderson, Moll');
insert into offeredcourses values (2014, 'Fall', 187, 60, 57, 'Barrington');*/

insert into reportcards values ('samfox', 187, /*'samfox', 187,*/ 'F');
insert into reportcards values ('samfox', 121, /*'samfox', 121,*/ 'F');