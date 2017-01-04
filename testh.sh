#!/bin/bash

# NOTE: The bundle install and database migration are skipped here.
# It is assumed that you already completed these steps, which are
# covered in the build_fast.sh script.

# This script tests the helpers and mailers only.

echo '-----------------------------------'
echo 'rake test test/helpers test/mailers'
rake test test/helpers test/mailers

export TEST_DATABASE_USERNAME=postgres
echo '---------------------------------'
echo 'rspec spec/helpers # spec/mailers'
rspec spec/helpers # spec/mailers
