#!/bin/bash

sh test_app.sh

# -A: runs all checks
# -q: output the report only; suppress information warnings
# -w2: level 2 warnings (medium and high only)
echo '---------------------------------------'
echo 'bundle exec brakeman -Aq -w2 --no-pager'
bundle exec brakeman -Aq -w2 --no-pager

echo '----------'
echo 'git status'
git status

sh outline-short.sh

echo '----------'
echo 'git status'
git status
