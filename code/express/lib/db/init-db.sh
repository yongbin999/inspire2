#! /bin/bash

psql --file=./lib/db/database.sql

psql --file=./lib/db/sampledata.sql