#!/bin/bash

# Use this script for upgrading gems.

# Do NOT use this script until you have set up this project with the build_fast.sh script.

echo '-------------'
echo 'bundle update'
bundle update

sh test_app.sh

echo '----------------------------------------------'
echo 'gemsurance --output log/gemsurance_report.html'
gemsurance --output log/gemsurance_report.html
echo 'The Gemsurance Report is at log/gemsurance_report.html .'
