#!/bin/bash

# This script runs the app through code metrics.
# Violations will not stop the app from passing but will be flagged here.

echo '--------------------------'
echo 'bundle install > /dev/null'
bundle install > /dev/null

# -A: runs all checks
# -q: output the report only; suppress information warnings
# -w2: level 2 warnings (medium and high only)
echo '----------------------------'
echo 'bundle exec brakeman -Aq -w2'
bundle exec brakeman -Aq -w2

echo '-----------------------'
echo 'bundle exec sandi_meter'
bundle exec sandi_meter

# Update the local ruby-advisory-db advisory database
echo '-------------------------------'
echo 'bundle exec bundle-audit update'
bundle exec bundle-audit update

# Audit the gems listed in Gemfile.lock
echo '------------------------'
echo 'bundle exec bundle-audit'
bundle exec bundle-audit

echo '----------------------------------------------------------'
echo 'bundle exec gemsurance --output log/gemsurance_report.html'
bundle exec gemsurance --output log/gemsurance_report.html
echo 'The Gemsurance Report is at log/gemsurance_report.html .'
