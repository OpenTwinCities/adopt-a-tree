#!/bin/bash

# NOTE: The bundle install and database migration are skipped here.
# It is assumed that you already completed these steps, which are
# covered in the build_fast.sh script.

# This script tests the controllers only.

echo '--------------------------'
echo 'rake test test/controllers'
rake test test/controllers

export TEST_DATABASE_USERNAME=postgres
echo '----------------------'
echo 'rspec spec/controllers'
rspec spec/controllers
