#! /bin/bash

psql --file=./lib/db/database.sql
echo Finished loading database
echo

psql --file=./lib/db/sampledata.sql
echo Finished loading sample data
echo

echo Server up and running!
echo Open Chrome to localhost:3000
