# Introduction #
We write several shell scripts (bash) to help users install SMW using SVN client. Such installation allows users to (i) install the latest version of wiki codes and extensions, and (ii) update the installation with the latest patches distributed via SVN.

# Prerequisites #
1. check your system has met [the requirements by mediawiki installation](http://www.mediawiki.org/wiki/Installation)
  * mysql 4.0 or higher version has been installed and running. you should have enough privilege to create a database and grant privileges. That ensures that you can install a media wiki database.
  * apache web server (httpd) 2.0 or higher version has been installed and is running. the root directory is < WWW-ROOT >
  * PHP 5.0 or higher version has been installed. php-mysql, ... has been configured with apache web server.

2. check if SVN client is installed. to do so, type the following command in console
```
svn --version
```
If svn is not installed, you may use the following code (if your linux support yum and you can log in as root).
```
yum install subversion
```


note: we only support linux with bash scripts

# Installation #
## A. Prepare setup scripts ##
**A1**. open a linux console, and create a directory for your wikis. Assume you will install wiki at directory /var/www/html/wiki
```
mkdir /var/www/html/wiki
cd /var/www/html/wiki
```

**A2**. download all setup scripts (some depends on some others).
new installation
```
svn checkout http://smwbp.googlecode.com/svn/trunk/install
```
OR update existing installation
```
svn update install
```

**A3**. copy setup scripts and make them executable
```
cp install/*  .
chmod +x *.sh
```
hint: you may review the setup scripts at http://code.google.com/p/smwbp/source/browse/#svn/trunk/setup

## B. Install MediaWiki 1.13 (MW) ##
**B1**. execute one setup script to install a wiki at a directory, e.g. test1
```
./setup-mw.sh test1
```
hint: you will see a sequence of shell command executed, they are essentially downloading the wiki codes from several Web hosts.

**B2**. install mediawiki following [MW setup instructions](http://www.mediawiki.org/wiki/Manual:Config_script). Typically you need to do the following:
```
bash# cd test1
bash# chmod a+w config/
...goto your wiki url and use web interface to configure your wiki...
...e.g. http://your.server/wiki/test1 in this case
...it is recommended to set database charset to "MySQL 4.1/5.0 UTF-8"
mv config/LocalSettings.php .
```

**B3** append the following line to the end of `LocalSettings.php`
```
require_once( "extensions/SMWBP/LocalSettings.smwbp.mw.php" );  #MW only
```


## C. Install the latest Active Semantic MediaWiki  (SWM) ##
```
WARNING: if you plan to install Halo extension (or near future), please go to section D.
This installation script will install the latest SMW released via SVN,which may be incompatible with the current Halo extension release.
```

**C1**. run scripts
```
./setup-svn-smw.sh test2
./setup-svn-ext.sh test2
```

**C2**. follow instructions from **B2**

**C3**. append the following line to the end of `LocalSettings.php`
```
require_once( "extensions/SMWBP/LocalSettings.smwbp.mw.php" );  #MW only

require_once( "extensions/SMWBP/LocalSettings.smwbp.smw.php" );  #SMW only
enableSemantics("example.org");
```

**C4**. initialize SMW following [SMW setup instructions](http://semantic-mediawiki.org/wiki/Help:Installation). Typically you need to do the following:
```
login wiki with administrator account
follow the link "special pages" (you can see a link in the sidebar)
follow the link "Admin functions for Semantic MediaWiki"
make sure the wiki's database account has additional "create table", "alter table" and "drop table" privilege on your wiki database.
click the button "initialize or upgrade database" 
```
After a successful installation, you should see the following text at the bottom of screen
```
The storage engine was set up successfully.
Return to Special:SMWAdmin
```
note:
  * create table and drop table is required by SMW initialization;
  * alter table is required by SMW+ initialization.

**C5**. (optional) append the following line to the end of `LocalSettings.php`
```
require_once( "extensions/SMWBP/LocalSettings.smwbp.ext.php" );  #recommended MW ans SMW extensions
```

see also
  * http://semantic-mediawiki.org/wiki/Help:Configuration


## D. Install Static Semantic MediaWiki with Halo Extension (SWM+) ##
```
NOTE: there are two setup packages
1. MW 1.13, SMW 1.4.1, semantic result format 1.4.0,  SMW+ 1.4.1
2. MW 1.14, SMW 1.4.2, semantic result format 1.4.2,  SMW+ 1.4.2
```

**D1**. run script
```
./setup-smw-1.4.2.sh test3
```
Note: alternatively, use "./setup-smw-1.4.1.sh test3"

**D2**. follow instructions from B2

**D3**. append the following line to the end of `LocalSettings.php`
```
require_once( "extensions/SMWBP/LocalSettings.smwbp.mw.php" );  #MW only

require_once( "extensions/SMWBP/LocalSettings.smwbp.smw.php" );  #SMW only
enableSemantics("http://your.server.name", true);   # you need to update your.server.name with your server name

require_once( "extensions/SMWBP/LocalSettings.smwbp.smwplus.php" );  #SMW+ halo extension
enableSMWHalo();
```

**D4**. follow instructions from C4 (initialize SMWPLUS database)

**D5**. (optional) append the following line to the end of `LocalSettings.php`
```
require_once( "extensions/SMWBP/LocalSettings.smwbp.ext.php" );  #recommended MW ans SMW extensions
```


note:
  * you may also check [SMW+ setup instructions](http://smwforum.ontoprise.com/smwforum/index.php/Manual_SMW%2B_Installation)


# Update Installed Wiki #
```
./setup-smwrpi.sh <MY-WIKI-PATH>
```

# FAQ #
  * frequent database issues when installing SWM
    * you need to make sure your wiki db user has the following privileges
      * "create,drop" (causing failure in SMW initialization),
      * "alter" (causing failure in SMW+ initialization)
    * the name of your wiki database should not contain special characters, e.g.
      * '-' (causing failure in SMW+ initialization)
    * there are some character encoding issues caused when using non-latin charset, you may consider adding the following lines to mysql configuration 'my.cnf'
```
default-character-set=utf8
character-set-server = utf8
collation-server = utf8_general_ci
```

  * for debugging purpose, we may change php.ini to show all errors
```
display_errors = On
display_startup_errors = On
```