drop table if exists students cascade;
drop table if exists coursecatalog cascade;
drop table if exists admins;
drop table if exists prerequisites;
drop table if exists offeredcourses;
drop table if exists reportcards;

drop type if exists level; 
drop type if exists grade;
drop type if exists sem;
drop type if exists offered cascade;

create type level as enum ('Freshman', 'Sophomore', 'Junior', 'Senior');
create type grade as enum ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F');
create type sem as enum ('Fall', 'Spring', 'Summer');
create type offered as enum ('Fall', 'Spring', 'Summer', 'Fall/Spring', 'Fall/Summer', 'Spring/Summer', 'Fall/Spring/Summer');

create table admins (
	id varchar(16),
	password varchar(25),
	firstname varchar(50),
	lastname varchar(50),
	isadminfor varchar(50)
);

create table students (
	id varchar(25),
	password varchar(25),
	firstname varchar(50),
	lastname varchar(50),
	year level,
	schoolorg varchar(100),
	gpa decimal,
	primary key (id)
);

create table coursecatalog (
	coursenumber varchar(6),
	coursename varchar(50),
	credits int,
	semestersoffered offered,
	instructor varchar(50),
	primary key (coursenumber)
);

create table prerequisites (
	coursenumber int,
	prereq int
);

/*Probably will not need this...*/
/*create table offeredcourses (
	year int,
	semester sem,
	coursenumber int,
	foreign key (coursenumber) references coursecatalog,
	capacity int,
	enrolled int,
	instructor varchar(50)
);*/

create table reportcards (
	id varchar(25),
	coursenumber int,
	/*foreign key (id) references students,
	foreign key (coursenumber) references coursecatalog,*/
	coursegrade grade
);

insert into admins values ('timrichards', 'password', 'Tim', 'Richards', 'UMass Amherst');
insert into admins values ('rodgrupen', 'password', 'Rod', 'Grupen', 'UMass Amherst');
insert into admins values ('admin', 'password', 'admin', 'admin', 'UMass Amherst');

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