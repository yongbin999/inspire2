drop table if exists students;
drop table if exists address;
drop table if exists lives;

create type level as enum ('freshman', 'sophomore', 'junior', 'senior');
create type grade as enum ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F');
create type sem as enum ('Fall', 'Spring', 'Summer');
create type offered as enum ('fall', 'spring', 'summer', 'fall/spring', 'fall/summer', 'spring/summer', 'fall/spring/summer');

create table admins (
	adminid varchar(16),
	password varchar(25),
	firstname varchar(50),
	lastname varchar(50)
);

create table students (
	id varchar(16),
	password varchar(25),
	firstname varchar(50),
	lastname varchar(50),
	year level,
	gpa decimal,
	primary key (id)
);

create table coursecatalog (
	coursenumber int,
	coursename varchar(50),
	credits int,
	prerequisites int, /*Make this other courses?*/
	semestersoffered offered,
	primary key (coursenumber)
);

/*Might not need this...*/
create table offeredcourses (
	foreign key (coursenumber) references coursecatalog,
	capacity int,
	enrolled int,
	description text,
	instructor varchar(50),
	semester sem,
	year int,
	primary key (coursenumber) /*Is this legal?*/
);

create table reportcards (
	foreign key (id) references students,
	foreign key (coursenumber) references offeredcourses,
	coursegrade grade
);

insert into admins values ('timrichards', 'password', 'Tim', 'Richards');
insert into admins values ('rodgrupen', 'password', 'Rod', 'Grupen');

insert into students values ('samfox', 'password', 'Sam', 'Fox', 'senior', 4.0);
insert into students values ('yongliang', 'password', 'Yong', 'Liang', 'junior', 4.0);
insert into students values ('alexrevello', 'password', 'Alex', 'Revello', 'sophomore', 4.0);
insert into students values ('joshbearor', 'password', 'Josh', 'Bearor', 'freshman', 4.0);
insert into students values ('drewmarchetti', 'password', 'Drew', 'Marchetti', 'senior', 4.0);
insert into students values ('khanhnguyen', 'password', 'Khanh', 'Nguyen', 'freshman', 4.0);

insert into coursecatalog values (105, 'Computer Literacy', 3, 0, 'fall/spring/summer');
insert into coursecatalog values (119, 'Introduction to Programming', 3, 0, 'fall/spring');	
insert into coursecatalog values (121, 'Introduction to Problem Solving With Computers', 4, 0, 'fall/spring');

/*create table users (
  uid SERIAL,
  fname varchar(50),
  lname varchar(50),
  password varchar(25),
  age int,
  primary key (uid)
  );*/

/*create table address (
	aid SERIAL,
	street varchar(100),
	city varchar(50),
	state varchar(2),
	zipcode varchar(9),
--	uid int,
	primary key (aid)
);

create table lives (
	uid int,
	aid int,
	foreign key (uid) references users,
	foreign key (aid) references address,
	unique(uid,aid)
);*/



/*insert into users values (1, 'John', 'Doe', 'xxxx', 27);
insert into users values (2, 'Jane', 'Doe', 'yyyy', 28);
insert into users values (3, 'Bill', 'Flood', 'aaaa', 29);
insert into users values (4, 'Veb', 'Nordhagen', 'bbbb', 30);
insert into users values (5, 'Hazel', 'Nutting', 'cccc', 4);
insert into users values (6, 'Caleb', 'Manu', 'dddd', 7);
insert into users values (7, 'Aiden', 'Hall', 'eeee', 19);*/

/*insert into address values (1, '1 mallard drive', 'cambridge', 'MA', '34567');
insert into address values (2, '21 jump street', 'new york', 'NY', '98765');
insert into address values (3, '4 cherry lane', 'truffala', 'NJ', '58235');
insert into address values (4, '16 strong road', 'chutney', 'VT', '38573');
insert into address values (5, '99 livingston circle', 'amherst', 'MA', '99822');
insert into address values (6, '1123 main street', 'worcester', 'MA', '22234');

insert into lives values
	(1, 6),
	(2, 4),
	(3, 6),
	(4, 2),
	(5, 5),
	(6, 1),
	(7, 3);*/
