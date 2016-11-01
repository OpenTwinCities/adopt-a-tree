#!/bin/bash

gem install mailcatcher
mailcatcher --ip 0.0.0.0
echo 'View mail at http://localhost:<port number>/'
echo 'If you are developing this app in the host environment, the port number is 1080.'
echo 'If you are using Docker or Vagrant, the port number may be something else.'
echo 'If you are using Docker Machine, replace "localhost" with the appropriate numerical IP address (probably 192.168.99.100).'
# Send mail through smtp://localhost:1025
