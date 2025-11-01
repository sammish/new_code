Step 1: Create Cloudflare Origin Certificate

In Cloudflare Dashboard:

Go to your domain

SSL/TLS menu

Origin Server

Create Certificate

Choose settings:

Private Key type: RSA

Validity: 15 years

Copy:

Certificate

Private Key

Step 2: Upload certs to ERPNext server

SSH into your ERPNext server.

Create certificate directory:

sudo mkdir -p /etc/nginx/ssl/erpnext


Create certificate file:

sudo nano /etc/nginx/ssl/erpnext/origin.crt


Paste Cloudflare Origin Certificate, save.

Create private key file:

sudo nano /etc/nginx/ssl/erpnext/origin.key


Paste Cloudflare Private Key, save.

Set permissions:

sudo chmod 600 /etc/nginx/ssl/erpnext/origin.key
sudo chmod 644 /etc/nginx/ssl/erpnext/origin.crt

Step 3: Modify bench Nginx config

Find your ERPNext site Nginx file (example):

cd /etc/nginx/conf.d/


Or sometimes:

cd /etc/nginx/sites-available/


Open the site config, example:

sudo nano /etc/nginx/conf.d/frappe-bench.conf


Find the HTTPS server block and replace SSL lines to:

ssl_certificate /etc/nginx/ssl/erpnext/origin.crt;
ssl_certificate_key /etc/nginx/ssl/erpnext/origin.key;
ssl_session_timeout 1d;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;


Save the file.

Step 4: Restart bench and Nginx
sudo bench setup nginx
sudo service nginx reload
sudo service nginx restart
sudo supervisorctl restart all


Double-check nginx syntax:

sudo nginx -t

Step 5: Cloudflare security settings

In Cloudflare dashboard:

Setting	Value
SSL Mode	Full (strict)
Always Use HTTPS	Enabled
HSTS	Enabled
Proxy (orange cloud)	Enabled
Disable Flexible SSL	Yes
Browser cache TTL	Recommended default
Rocket Loader	Off for ERPNext (optional)

Also go to Firewall rules and restrict direct IP access later.

Step 6: Restrict server access to Cloudflare IPs only (Important)

Edit firewall:

sudo ufw allow ssh
sudo ufw enable


Allow Cloudflare IP ranges only for HTTP/HTTPS:

Download Cloudflare IP list:

curl https://www.cloudflare.com/ips-v4 -o ips-v4.txt
curl https://www.cloudflare.com/ips-v6 -o ips-v6.txt


Loop add rules:

for ip in $(cat ips-v4.txt); do sudo ufw allow from $ip to any port 443 proto tcp; done
for ip in $(cat ips-v6.txt); do sudo ufw allow from $ip to any port 443 proto tcp; done


Block other access:

sudo ufw deny 80
sudo ufw deny 443


This ensures traffic only passes through Cloudflare.

Verification checklist
Check	Command
Nginx certificate active	curl -v https://yourdomain.com
Cloudflare SSL mode	Full strict
Origin HTTP access blocked	curl http://server-ip should fail
Browser padlock	Secured
ERPNext working	Login test
🎯 Result

You now have:

Cloudflare edge TLS

Origin TLS with long-life cert

DDoS and WAF protection

Zero Let's Encrypt renewal headaches

ERPNext safe from direct hits

Good move for production ERPNext.

ood setup for you

Frappe/ERPNext server certificate: Let's Encrypt

Cloudflare: Full (strict) SSL mode

Cloudflare proxied DNS (orange cloud)

This gives you secure browser → Cloudflare → ERPNext encryption.

✅ What to check

Go to Cloudflare dashboard > SSL/TLS settings

Make sure:

Setting	Value
SSL Mode	Full (strict)
Always use HTTPS	Enabled
Minimum TLS	TLS 1.2 or higher

Do not use "Flexible SSL" because it breaks ERPNext and is less secure.

✅ Small compatibility note

Sometimes Cloudflare security features can block ERPNext background jobs or API calls. If you see strange login or websocket issues, set:

Firewall > Bot Fight Mode → Off (optional for ERPNext)

Speed > Rocket Loader → Off

Those avoid conflicts with Frappe's JS and sockets.

👍 You're good to continue

Let's Encrypt is strong, compatible, and safe. No need to change unless you want long-term certificates later.

You made a solid decision to keep your setup simple and secure.

✅ Quick checklist for safest configuration

Inside Cloudflare Dashboard:

Setting	Value
SSL Mode	Full (strict)
Always Use HTTPS	ON
HSTS	ON (after testing)
Automatic HTTPS rewrites	ON
Rocket Loader	OFF (ERPNext compatibility)
Bot Fight Mode	OFF (optional)

✅ Step 1: Check browser HTTPS lock

Open your site:

https://oropendola.ai


Verify:

✅ Padlock icon is visible

✅ No certificate warnings

✅ Certificate issued by Let’s Encrypt

Click the padlock → “Connection is secure” → “Certificate” to confirm.

✅ Step 2: Check Cloudflare SSL mode

Go to Cloudflare dashboard:

SSL/TLS → Overview

Verify it shows:

✅ Full (strict)

If it says “Flexible”, change it immediately. Frappe will break.

✅ Step 3: Confirm Cloudflare is proxying

Go to DNS in Cloudflare.

Your A record for the domain should show:

Orange cloud ✅ (Proxied)

Not grey cloud ❌

✅ Step 4: Terminal check from your server

SSH into your ERPNext server and run:

curl -I https://yourdomain.com


Expected output contains:

HTTP/2 200
server: nginx
cf-ray: ... Cloudflare header ...


Key point: cf-ray means Cloudflare is active.

✅ Step 5: Test origin SSL directly (optional but strong test)

Run on your server:

openssl s_client -connect yourdomain.com:443 -servername yourdomain.com


Look for:

issuer=Let's Encrypt
Verify return code: 0 (ok)


That confirms your Let's Encrypt cert is valid and live.

✅ Step 6: Confirm WebSockets working

In ERPNext, open Desk → Console → Watch browser dev tools.

Press F12 → Network tab → WS filter

Check socket.io connection status shows:

✅ 101 Switching Protocols

✅ No continuous reconnects

If you see 400/403/502, tell me and I will fix it for you.

✅ Step 7: Test direct server IP blocked (security)

Visit your server IP in browser:

http://your.server.ip


You want to see:

❌ Not opening ERPNext login page

✅ Blocked / timed out / Cloudflare error / default page

This confirms no one can bypass Cloudflare.

✅ Step 2: Allow only Cloudflare IPs to reach your server

Run on Ubuntu:

sudo ufw allow ssh
sudo ufw deny http
sudo ufw deny https


Then add Cloudflare IP ranges:

IPv4
for ip in $(curl https://www.cloudflare.com/ips-v4); do sudo ufw allow from $ip to any port 443 proto tcp; done
for ip in $(curl https://www.cloudflare.com/ips-v4); do sudo ufw allow from $ip to any port 80 proto tcp; done

IPv6 (if you use IPv6)
for ip in $(curl https://www.cloudflare.com/ips-v6); do sudo ufw allow from $ip to any port 443 proto tcp; done
for ip in $(curl https://www.cloudflare.com/ips-v6); do sudo ufw allow from $ip to any port 80 proto tcp; done


Enable firewall:

sudo ufw enable
sudo ufw status

✅ Step 3: Cloudflare settings for ERPNext

Inside Cloudflare Dashboard → Rules → Security

Setting	Value
WAF	ON
Security Level	Medium or High
Bot Protection	Standard
Browser Integrity Check	ON
DDoS Attack Mode	Auto
Firewall rules to add

Block direct access by IP:

Rule:

(http.host eq "your-server-ip")


Action: Block

Block admin brute force:

(http.request.uri.path contains "/login") or (http.request.uri.path contains "/desk")


Action: Challenge (JS Challenge)

https://oropendola.ai/ site not reaching 

