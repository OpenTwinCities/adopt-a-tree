#!/bin/bash

# This script logs the output of tests.
# This is handy if you need to use the puts page.body command to troubleshoot.

sh test_app.sh 2>&1 | tee 'log/test_app.log'

echo '----------------------------------------------------'
echo 'The screen output has been saved at log/test_app.log'
echo ''
