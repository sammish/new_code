npx browserslist@latest --update-db

bench --site erp.biosme.com set-admin-password @Biosme

bench --site {site} backup --with-files

bench --site site_name restore --force --encryption-key YOUR_ENCRYPTION_KEY /tmp/file_name

with file restore

bench --site YOUR_SITE_NAME restore --force --encryption-key YOUR_ENCRYPTION_KEY /FILE_PATH --with-public-files /FILE_PATH --with-private-files /FILE_PATH 

Update SQL
set sql_safe_updates=0;
UPDATE tabSingles SET value =0 WHERE tabSingles.doctype = 'System Settings' AND tabSingles.field = 'disable_user_pass_login';

INFO: A newer version of bench is available: 5.2.0 → 5.2.1
pip3 install --upgrade frappe-bench
python3.10 -m pip install --upgrade pip

bench migrate --skip-failing

bench remove-app app_name
bench --site {site_name} uninstall-app {app_name} --yes

bench pip install numpy

sudo chmod o+x /home/frappe

Developer Mode
bench set-config developer_mode 1
bench set-config maintenance_mode 1

{ { frappe.utils.rounded(row.amount, 0) }}
{{frappe.utils.flt(row.rate*10/100*row.qty, 3)}}

Auto renewal (experimental)
Login as root or a user with superuser privileges, run crontab -e and enter:

# renew letsencrypt certificates on 1st monday of every month and get an email if it gets executed
MAILTO="mail@example.com"
0 0 1-7 * * [ "$(date '+\%a')" = "Mon" ] &amp;&amp; sudo service nginx stop &amp;&amp; /opt/certbot-auto renew &amp;&amp; sudo service nginx start

sudo nano /etc/supervisor/supervisord.conf

chmod=0770
chown=frappe:supervisor


sudo groupadd supervisor
sudo usermod -aG supervisor frappe

sudo service supervisor restart

sudo supervisorctl restart all

yarn install v1.22.19
[1/5] Validating package.json...
error frappe-framework@: The engine "node" is incompatible with this module. Expected version ">=14". Got "12.22.9"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
ERROR:

sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo n latest


ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
frappe 14.21.1 requires Click~=7.1.2, but you have click 8.1.3 which is incompatible

pip install click==8.1.3


error @vitejs/plugin-vue@3.2.0: The engine "node" is incompatible with this module. Expected version "^14.18.0 || >=16.0.0". Got "14.15.0"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
ERROR:


nvm install v14.18.0

[mysqld]
max_allowed_packet= 1024M
wait_timeout= 60000





To install in Ubuntu 22.04


sudo apt-get install -y xfonts-75dpi
sudo wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb
sudo dpkg -i wkhtmltox_0.12.6.1-2.jammy_amd64.deb
sudo cp /usr/local/bin/wkhtmlto* /usr/bin/
sudo chmod a+x /usr/bin/wk*
And also add the host_name in site_config.json
"host_name": "https://yourdomainname"
Network error is usually when wkhtmltopdf can’t resolve or need the fully resolved URLs to the assets

bench use site1.local
bench config dns_multitenant on

openssl req -new -newkey rsa:2048 -nodes -keyout erpnext.local.key -out erpnext.local.crt
chown root erpnext.local.key
chmod 600 erpnext.local.key
mkdir /etc/nginx/conf.d/ssl
mv erpnext.local.key /etc/nginx/conf.d/ssl/
mv erpnext.local.crt /etc/nginx/conf.d/ssl/

bench set-ssl-certificate site1.local /etc/nginx/conf.d/ssl/erpnext.local.crt
bench set-ssl-key site1.local /etc/nginx/conf.d/ssl/erpnext.local.key
bench setup nginx
sudo service nginx reload

But these command fail in reloading nginx

service nginx reload
service nginx restart




$ npm run snyk-protect
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1680687560026-0.7622373181220559/node but npm is using /home/frappe/.nvm/versions/node/v14.15.0/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.


npm config set scripts-prepend-node-path true


npm install -g npm

Extract Sql.Gz File On Command Line

gzip -d file_name.sql.gz

tar -xvf your.tar


copy
sudo cp -a /tmp/hydrotechglobal.frappe.cloud/private/files/ . /home/frappe/frappe-bench/sites/tbo.hydrotechglobal.com/private/files/



bench --site tbo.hydrotechglobal.com mariadb
set sql_safe_updates=0;
delete from `tabDeleted Document`;
delete from `tabData Import`;



Insights

Node update

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
node -v
nvm install 16

or
node -v
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 18
nvm use 18

error @typescript-eslint/eslint-plugin@5.55.0: The engine "node" is incompatible with this module. Expected version "^12.22.0 || ^14.17.0 || >=16.0.0". Got "14.15.0"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.

yarn add @typescript-eslint/eslint-plugin@5.54.1



mysql -u root -p _430cf5694dbe4d3a -h localhost -P 3306

mysql -u frappe -p _e1473bc3353709e8 -h 128.140.4.103 -P 3306 --ssl --ssl-verify-server-cert


nvm install 18.0.0
nvm install 18.0.0
nvm use 18.0.0



No module named 'posthog' but is installed when logon to erpnext

bench setup requirements && bench build && bench restart



HelpDesk fixing

npm install -g postcss
npm cache clean --force
yarn cache clean


version 13 SSL fixing
pip install --upgrade urllib3 requests-toolbelt
sudo pip uninstall certbot
sudo pip install certbot



Eval
Mandatory Depends On and Read Only Depends On

eval:doc.is_stock_item

Item Default
Default Expense Account
eval:parent.is_stock_item==0


frappe.db.set_value('Report', 'Employee Checkin Register', 'add_total_row', True)
