#!/bin/bash

echo '-------------------------------'
echo 'sudo service postgresql restart'
sudo service postgresql restart
wait

export TEST_DATABASE_USERNAME=postgres

echo '--------------'
echo 'bundle install'
bundle install

echo '-------------------------------'
echo 'bundle exec rake db:schema:load'
bundle exec rake db:schema:load

echo '------------------------'
echo 'bundle exec rake db:seed'
bundle exec rake db:seed
