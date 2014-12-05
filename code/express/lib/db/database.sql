drop table if exists students cascade;
drop table if exists coursecatalog cascade;
drop table if exists prerequisites;
/*drop table if exists offeredcourses;*/
drop table if exists reportcards;
drop table if exists studentschedule;
/*drop table if exists major_tracks;*/


drop type if exists level; 
drop type if exists grade;
drop type if exists sem;
drop type if exists offered cascade;
drop type if exists track;

create type level as enum ('Freshman', 'Sophomore', 'Junior', 'Senior');
create type grade as enum ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F');
create type sem as enum ('Fall', 'Spring', 'Summer');
create type offered as enum ('Fall', 'Spring', 'Summer', 'Fall/Spring', 'Fall/Summer', 'Spring/Summer', 'Fall/Spring/Summer');
create type track as enum ('Software Engineering', 'Security & Privacy', 'Robotics, Vision, and Graphics', 'Artificial Intelligence', 'Computer Architecture', 'Networking', 'Software Systems', 'Programming Languages & Compilers', 'Theory of Computation', 'Search & Data Mining');

create table students (
	id varchar(25),
	password varchar(25),
	firstname varchar(50),
	lastname varchar(50),
	year level,
	schoolorg varchar(100),
	gpa decimal,
	trackid track,
	primary key (id)
);

/*create table major_track (
	track_shortname varchar(50),
	track_description varchar(50),
	coursenumber varchar(50),
	primary key (coursenumber)
);*/

create table coursecatalog (
	coursenumber varchar(8),
	coursename varchar(100),
	credits int,
	semestersoffered offered,
	instructor varchar(50),
	primary key (coursenumber)
);

create table prerequisites (
	coursenumber varchar(6),
	prereq varchar(6)
);

create table studentschedule (
	studentid varchar(25),
	coursenumber varchar(25),
	term varchar(20),
	instructor varchar(50)
);

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
