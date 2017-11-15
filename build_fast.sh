#!/bin/bash

# This script is Joel Spolsky's one-step build process at work and is intended to
# be used in tandem with the debian-jessie-rbenv-adoptatree Docker images.

# You can reinstall Ruby on Rails in seconds instead of hours.
# You can have everything working on your machine in minutes instead of hours or days.

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

FILE_LOG_OUTLINE='log/all-outline.log'
echo '---------------------------------'
echo "sh outline.sh > $FILE_LOG_OUTLINE"
sh outline.sh > $FILE_LOG_OUTLINE

d_mo='log/diagram-models.jpg'
d_co='log/diagram-controllers.jpg'
d_gems='log/diagram-gems.jpg'

echo 'outline.sh OUTPUT FILES:'
echo $d_mo
echo $d_co
echo $d_gems
echo 'Directory trees are in the notes directory.'

FILE_LOG_TEST_CODE='log/all-test_code.log'
echo '-------------------------------------'
echo "sh test_code.sh > $FILE_LOG_TEST_CODE"
sh test_code.sh > $FILE_LOG_TEST_CODE
echo 'The Gemsurance Report is at log/gemsurance_report.html .'
