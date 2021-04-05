#!/bin/bash

#SYNC MONGODB DATABASE FROM REMOTE SERVER
#NOTE: This overwrites the local copy of the database

remoteHost='yourhost.com'
remoteDbUser='root'
remoteDbPasswd='password123'
remoteDb='test'
localDb='test'

mongo $localDb --eval "db.dropDatabase(); db.copyDatabase('$remoteDb', '$localDb', '$remoteHost', '$remoteDbUser', '$remoteDbPasswd')"
