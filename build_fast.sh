#!/bin/bash

# This script is Joel Spolsky's one-step build process at work and is intended to
# be used in tandem with the debian-jessie-rbenv-adoptatree Docker images.

# You can reinstall Ruby on Rails in seconds instead of hours.
# You can have everything working on your machine in minutes instead of hours or days.

# ENTERING THE CUSTOMIZED DOCKER IMAGE:
# 1.  Have Docker or Docker Machine installed on your host OS.
# 2.  Enter the following commands:
#     git clone https://github.com/OpenTwinCities/docker-debian-jessie
#     sh rbenv-adoptatree.sh # Use 32rbenv-adoptatree.sh instead if using a 32-bit system.
#     cd rbenv-adoptatree
#     sh download_new_image.sh
# 3.  If your Internet connection is reasonably fast, you will be in the Docker
#     development environment, where you can get started on this project.

# GETTING STARTED
# 1.  Use tmux for simultaneous operations
# 2.  Enter the following commands:
#     git clone https://github.com/OpenTwinCities/adopt-a-tree.git
#     cd adopt-a-tree
# 3.  Enter the command "sh build_fast.sh".  In a few minutes, your project should be
#     fully set up, and all tests should pass.

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

echo '-------------------------------'
echo 'bundle exec rake db:schema:load'
bundle exec rake db:schema:load

echo '------------------------'
echo 'bundle exec rake db:seed'
bundle exec rake db:seed

echo '----------------'
echo 'bundle exec rake'
bundle exec rake
