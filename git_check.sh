#!/bin/bash

sh test_app.sh

echo '----------------------------'
echo 'bundle exec brakeman -Aq -w2'
bundle exec brakeman -Aq -w2

echo '----------'
echo 'git status'
git status

sh outline-short.sh

echo '----------'
echo 'git status'
git status
