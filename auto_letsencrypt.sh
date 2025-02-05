sudo crontab -e
59 23 28-31 * * [ "$(date -d tomorrow +\%d)" == "01" ] && systemctl stop nginx && certbot renew && systemctl start nginx


sudo systemctl stop nginx
sudo certbot renew
sudo systemctl start nginx
