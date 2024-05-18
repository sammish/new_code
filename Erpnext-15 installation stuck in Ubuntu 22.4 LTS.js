ssh -p 8763 intozi@api.intozi.io
ssh-keygen -R
lsb_release -a


sudo adduser frappe
sudo usermod -aG sudo frappe
su frappe

sudo apt-get update && sudo apt-get upgrade
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.11
sudo apt remove --purge python3-apt
sudo apt install python3-apt
sudo apt autoremove
sudo apt-get install curl
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
sudo apt install python3.10-venv
sudo apt-get install python3-pip
sudo apt install cython3
sudo apt-get install software-properties-common
sudo apt install mariadb-server
sudo mysql_secure_installation
sudo apt-get install libmysqlclient-dev
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

[server]
user = mysql
pid-file = /run/mysqld/mysqld.pid
socket = /run/mysqld/mysqld.sock
basedir = /usr
datadir = /var/lib/mysql
tmpdir = /tmp
lc-messages-dir = /usr/share/mysql
bind-address = 127.0.0.1
query_cache_size = 16M
log_error = /var/log/mysql/error.log

[mysqld]
innodb-file-format=barracuda
innodb-file-per-table=1
innodb-large-prefix=1
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
innodb-read-only-compressed=FALSE
max_allowed_packet= 1300M
wait_timeout= 60000
innodb_force_recovery = 1
net_read_timeout = 3600
net_write_timeout = 3600

[mysql]
default-character-set = utf8mb4

#character-set-server  = utf8mb4
#collation-server      = utf8mb4_general_ci

sudo service mysql restart
sudo apt-get install redis-server
sudo systemctl enable redis-server

curl https://raw.github.com/creationix/nvm/master/install.sh | sh
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
nvm install 18
sudo apt-get install npm
sudo apt update && sudo apt install nginx -y
sudo npm install -g yarn
npm install -g npm@10.8.0
sudo apt-get install xvfb libfontconfig wkhtmltopdf
cd /tmp
sudo apt-get install -y xfonts-75dpi
sudo wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb
sudo dpkg -i wkhtmltox_0.12.6.1-2.jammy_amd64.deb
sudo cp /usr/local/bin/wkhtmlto* /usr/bin/
sudo chmod a+x /usr/bin/wk*

sudo chmod o+x /home/frappe
sudo -H pip3 install frappe-bench or sudo -H pip3 install frappe-bench --break-system-packages
bench init frappe-bench --frappe-branch version-15
cd frappe-bench
sudo bench setup production frappe --yes
sudo nano /etc/supervisor/supervisord.conf
chmod=0770
chown=frappe:supervisor
sudo groupadd supervisor
sudo usermod -aG supervisor frappe
sudo service supervisor restart
sudo supervisorctl restart all
sudo reboot
sudo bench setup production frappe --yes
sudo supervisorctl stop all
sudo supervisorctl start all
bench config dns_multitenant on
bench update --requirements

If error
bench setup socketio
bench setup supervisor
bench setup redis
sudo supervisorctl reload

bench build
SSL
sudo apt-get install certbot
bench new-site site_name
sudo -H bench setup lets-encrypt site_name
bench setup add-domain www.domain_name.in
sudo -H bench setup lets-encrypt [site-name] --custom-domain [custom-domain]

bench get-app https://github.com/8848digital/KSA.git
bench get-app erpnext --branch version-15
bench get-app --branch version-15 https://github.com/frappe/hrms.git
bench get-app --branch version-15 https://github.com/teambackoffice/service-pro.git
bench get-app --branch version-15 https://github.com/resilient-tech/india-compliance.git
bench get-app --branch version-15 https://github.com/frappe/payments.git
source env/bin/activate
pip install cmake
bench get-app --branch version-15 https://github.com/Momscode-Technologies/face_app.git
