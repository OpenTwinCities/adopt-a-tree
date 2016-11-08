#!/bin/bash

# After you use the reset.sh script to return the Docker container to a
# fresh Ruby on Rails environment and use the "git clone" command to
# download this project's source code, running this script sets up this
# project AND runs all tests.

# Resetting the Docker container to its original state AND running this
# script ensures that you are on top of all dependencies and can avoid
# being stopped in your tracks by the infamous "works on my machine"
# problem.

# This is Joel Spolsky's one-step build process at work.

PG_VERSION="$(ls /etc/postgresql)"
PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"

# Change the settings in the pg_hba.conf file
# Use the settings from the Travis environment with these two differences:
# 1.  Full access to the adopta user
# 2.  Full access to 0.0.0.0 (localhost) for pgAdmin host machine access
echo '-------------------'
echo "Configuring $PG_HBA"

sudo bash -c "echo '# TYPE  DATABASE        USER            ADDRESS                 METHOD' > $PG_HBA"
sudo bash -c "echo '' >> $PG_HBA"
sudo bash -c "echo '# Allow adopta user to connect to database without password' >> $PG_HBA"
sudo bash -c "echo 'local   all             adopta                                  trust' >> $PG_HBA"
sudo bash -c "echo '' >> $PG_HBA"
sudo bash -c "echo '# Allow postgres user to connect to database without password' >> $PG_HBA"
sudo bash -c "echo 'local   all             postgres                                trust' >> $PG_HBA"
sudo bash -c "echo '' >> $PG_HBA"
sudo bash -c "echo 'local   all             all                                     trust' >> $PG_HBA"
sudo bash -c "echo '' >> $PG_HBA"
sudo bash -c "echo '# IPv4 local connections:' >> $PG_HBA"
sudo bash -c "echo 'host    all             all             0.0.0.0/0               trust' >> $PG_HBA"
sudo bash -c "echo '' >> $PG_HBA"
sudo bash -c "echo '# IPv6 local connections:' >> $PG_HBA"
sudo bash -c "echo 'host    all             all             ::1/128                 trust' >> $PG_HBA"

echo '-------------------------------'
echo 'sudo service postgresql restart'
sudo service postgresql restart
wait

export TEST_DATABASE_USERNAME=postgres

echo '------------------'
echo 'gem update bundler'
gem update bundler

echo '--------------'
echo 'bundle install'
bundle install

echo '-------------------------------------'
echo 'sudo -u postgres createuser -d adopta'
sudo -u postgres createuser -d adopta

echo '-------------------------------------------------'
echo "'create database adopta_development;' -U postgres"
psql -c 'create database adopta_development;' -U postgres

echo '--------------------------------------------------'
echo "psql -c 'create database adopta_test;' -U postgres"
psql -c 'create database adopta_test;' -U postgres

echo '----------------------------------------------'
echo 'psql -U postgres -c "create extension postgis"'
psql -U postgres -c "create extension postgis"

echo '-------------------------------'
echo 'bundle exec rake db:schema:load'
bundle exec rake db:schema:load

echo '------------------------'
echo 'bundle exec rake db:seed'
bundle exec rake db:seed

echo '----------------'
echo 'bundle exec rake'
bundle exec rake
