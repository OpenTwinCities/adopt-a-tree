#!/bin/bash

# NOTE: The bundle install and database migration are skipped here.
# It is assumed that you already completed these steps, which are
# covered in the build_fast.sh script.

# This script tests the models only.

echo '---------------------'
echo 'rake test test/models'
rake test test/models

export TEST_DATABASE_USERNAME=postgres
echo '-----------------'
echo 'rspec spec/models'
rspec spec/models
