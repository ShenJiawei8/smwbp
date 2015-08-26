  * author: Li Ding
  * date: 2008/08/22

# Introduction #
We have installed Mediawiki on an internal server behind firewall, and incoming port 25 (smtp) traffic is filtered by the firewall. Under this configuration, eamils directly sent by the smtp service on local server {SMTP-LOCAL} can only go to {SMTP-REMOTE} smtp servers within the same firewall, and will be refused by outside smtp servers (e.g. smtp.gmail.com). **Smtp relay**, therefore, is one way to address this issue. In this article, we will show how to relay emails to a smtp server (SMTP-RELAY} which is located within the same firewall but has its port 25 opened (i.e. can contact outside smtp servers).

Interesting enough, we also found that email sent by apache (or any user whose user name is not registered account on the {SMTP-RELAY} server) from local server {SMTP-RELAY} was not accepted for relaying by the {SMTP-RELAY} server. This is caused by the configuration of the {SMTP-REMOTE} server. Therefore, we took ad hoc email header rewriting to fix this gap for the apache account only.


# Details #

## Prerequisite ##
  * please make sure that the package **sendmail** is installed. the following maybe helpful
```
yum install sendmail
yum install sendmail-cf
yum install m4
```

  * please check the following
```
/etc/mail/   - there must be some configuration files there
/sbin/service sendmail restart - we can use this to start and stop sendmail service
/usr/sbin/sendmail  - the sendmail function that send mails
```

  * make sure you have root privileges
  * instructions are only tested on linux (redhat enterprise AS4, and centos 5).

## Configure SMTP Relay ##
1. log in as root


2. open file /etc/mail/sendmail.mc
```
vi /etc/mail/sendmail.mc
```
find and uncomment the line containing SMART\_HOST, change its value to '{SMTP-RELAY}' (set that to a smtp server), which is the preferred smtp server for relaying email.
```
define(`SMART_HOST', `{SMTP-RELAY}')
```
note:
  * to comment and uncomment code in this configuration file, use 'dnl'. for each line, any text after 'dnl' will be treated as comment.

3. Then create the file /etc/mail/sendmail.cf
```
m4 /etc/mail/sendmail.mc > /etc/mail/sendmail.cf
```

4. restart sendmail serv
```
/sbin/service sendmail restart 
```

## Rewrite Email Header ##
This step is needed only because some relay SMTP servers does check the from filed in email for security reasons. In our case, apache was not recognized as a valid user on the relay SMTP server, therefore, we rewrite the header of emails sent by apache to a valid user name {SMTP-RELAY-USER-NAME} which is known by the relay {SMTP-RELAY} server. It is also notable that this will help us to enable a valid reply address.

1. Edit /etc/mail/genericstable  (this file may not exist)
```
vi /etc/mail/genericstable
```
add the following line in this file. The line means: replace "apache" with "{SMTP-RELAY-USER-NAME}" in the envelop of email. This instruction ensure the mail accepted by the relay-smtp-server.
```
apache   {SMTP-RELAY-USER-NAME}
```

2.Create the corresponding database
```
makemap hash /etc/mail/genericstable < /etc/mail/genericstable
```

3.update /etc/mail/sendmail.mc
```
vi /etc/mail/sendmail.mc
```
find and uncomment **FEATURE(masquerade\_envelope)**
```
FEATURE(masquerade_envelope)dnl
```
insert the following lines after that line
```
FEATURE(`genericstable')dnl
GENERICS_DOMAIN(`domain-name-of-local-server')dnl
```

4. make the file /etc/mail/sendmail.cf
```
m4 /etc/mail/sendmail.mc > /etc/mail/sendmail.cf
```

5. restart sendmail
```
/sbin/service sendmail restart
```

## Verify Configuration ##
  * please replace the `<account@your-email-server>` with your email address.
  * to troubleshoot if you cannot get a mail using the following steps, please check the mail-log using the following command
```
less /var/log/maillog
```

### shell command verification ###
option A. The following command should show a delivery path through the relay smtp server
```
/usr/sbin/sendmail -bv <your-mail>@<your-domain> 
```

option B: Run the following command. You should receive the mail shortly if your configuration is correct.
```
/usr/sbin/sendmail  <account@your-email-server>
```
> To end email, type the following:
  * press a key 'ENTER' to start a new line,
  * type a key '.'
  * press the key 'ENTER' again to indicate the end of the email.

### php verification ###
You can also test sendmail using a php file like the following:

1. create a file
```
vi test-sendmail.php
```

2. paste the following content
```
<?php    
  mail('<account@your-email-server>', 'php sendmail test', 'hello world.');  
?>
```

3. run the following command to check the above php file.
```
php  test-sendmail.php
```

# References #
  1. Sven Knispel, Configure sendmail for SMTP relay with your ISP, http://cri.ch/linux/docs/sk0009.html, Updated: 05-01-2005
  1. sendmail Features configuration notes, http://www.sendmail.org/m4/features.html