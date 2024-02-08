cd /opt/dev/bl1
composer require drush/drush
cd /opt/dev/bl2
composer require drush/drush
cd /opt/stg/bl1
composer require drush/drush
cd /opt/stg/bl2
composer require drush/drush

cd /usr/src/app
node .output/server/index.mjs