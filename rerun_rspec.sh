#!/bin/bash

# Run this script to run only the tests that failed.

echo '-------------------------------'
echo 'sudo service postgresql restart'
sudo service postgresql restart
wait

export TEST_DATABASE_USERNAME=postgres

echo '---------------------'
echo 'rspec --only-failures'
rspec --only-failures
