#!/bin/bash

# If you get Spring errors when you attempt to test your app,
# you need to kill the old Spring process so that a new one
# can be automatically created to replace it.

echo '------------------'
echo 'pkill -9 -f spring'
pkill -9 -f spring
