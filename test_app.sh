#!/bin/bash

# This script runs the "bundle install" command, database migrations,
# and tests.  This is a shortened version of the build_fast.sh script.

# Do NOT use this script until you have set up this project with the build_fast.sh script.

echo '-------------------------------'
echo 'sudo service postgresql restart'
sudo service postgresql restart
wait

export TEST_DATABASE_USERNAME=postgres

echo '--------------'
echo 'bundle install'
bundle install

echo '---------------------------'
echo 'bundle exec rake db:migrate'
bundle exec rake db:migrate

echo '----------------'
echo 'bundle exec rake'
bundle exec rake
