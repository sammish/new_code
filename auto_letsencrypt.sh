sudo apt-get install expect -y

Step 2: Create a Script (auto_letsencrypt.sh)

#!/usr/bin/expect -f

set timeout -1

# List of sites
set sites {
    aaamal.amco-group.com
    con.amco-group.com
    erp.ass-trading.com
    euro.amco-group.com
    mak.amco-group.com
    man.amco-group.com
    masader.amco-group.com
    masader.natcosaudi.com
    mec.amco-group.com
    mtc.natcosaudi.com
    pos.natcosaudi.com
    red.amco-group.com
    sharis.natcosaudi.com
}

foreach site $sites {
    spawn sudo -H bench setup lets-encrypt $site
    
    expect {
        "Select the appropriate number*" {
            send "1\r"
            exp_continue
        }
        "nginx.conf already exists*" {
            send "y\r"
            exp_continue
        }
        "Do you want to continue?*" {
            send "y\r"
            exp_continue
        }
        eof
    }
}






sudo chmod +x auto_letsencrypt.sh

./auto_letsencrypt.sh
