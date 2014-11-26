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
	coursenumber int,
	coursename varchar(50),
	description text,
	credits int,
	semestersoffered offered,
	primary key (coursenumber)
);

create table prerequisites (
	coursenumber int,
	prereq int
);

create table offeredcourses (
	year int,
	semester sem,
	coursenumber int,
	foreign key (coursenumber) references coursecatalog,
	capacity int,
	enrolled int,
	instructor varchar(50)
);

create table reportcards (
	id varchar(25),
	coursenumber int,
	foreign key (id) references students,
	foreign key (coursenumber) references coursecatalog,
	coursegrade grade
);
