#!/bin/bash

sh outline-short.sh

d_mo='log/diagram-models.jpg'
d_co='log/diagram-controllers.jpg'
d_gems='log/diagram-gems.jpg'

echo '---------------'
echo 'Using rails-erd'
bundle exec erd --attributes=foreign_keys,primary_keys,timestamps,inheritance,content --filetype=dot --filename=log/diagram-models --inheritance --notation=bachman
dot -Tjpg log/diagram-models.dot > $d_mo
echo
echo "Models diagram is at $d_mo"
echo

echo '---------------'
echo 'Using railroady'
bundle exec railroady -i -l TestLabel -v -a --all-columns -j -m -p -z -t --engine-controllers -C | dot -Tjpg > $d_co
echo
echo "Controllers diagram is at $d_co"
echo

echo '-----------------------------------------------------'
echo 'Drawing gem dependency diagram (log/diagram-gems.jpg)'
bundle viz --file=log/diagram-gems --format=jpg --requirements --version

echo '************************'
echo 'outline.sh OUTPUT FILES:'
echo $d_mo
echo $d_co
echo $d_gems
echo 'Directory trees are in the notes directory.'
echo
