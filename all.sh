#!/bin/bash

# Run this script to set up your project again after resetting the Docker container.

clear

sh test_app.sh

FILE_LOG_TEST_CODE='log/all-test_code.log'
echo '-------------------------------------'
echo "sh test_code.sh > $FILE_LOG_TEST_CODE"
sh test_code.sh > $FILE_LOG_TEST_CODE
echo 'The Gemsurance Report is at log/gemsurance_report.html .'
