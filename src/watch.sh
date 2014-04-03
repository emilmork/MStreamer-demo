#!/bin/sh
# 
# watch.sh - the only file-changed-watcher you'll ever need!
# 
# Usage:
#   $ sh watch.sh "echo File changed"
#   $ sh watch.sh make "-not -name *.swp"
#
 
# one liner variant: 
#   touch now; while true; do while [ -z `find  -L . -type f -newer now $2` ]; do sleep 1; done; $1; touch now; done;
 
# blocking-handling variant (by @gnab):
$1 &
NOW=`date`
while true; do 
  while [ -z `find -L . -type f -newermt "$NOW" $2` ]; do 
    sleep 1
  done; 
  kill -0 $! && kill $! && sleep 1
  $1 &
  NOW=`date`
done
