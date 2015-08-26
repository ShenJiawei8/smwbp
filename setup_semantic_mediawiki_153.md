# Prerequisites #
1. make sure if your system meets [the requirements of mediawiki installation](http://www.mediawiki.org/wiki/Installation)
  * mysql 4.0 or higher version has been installed and running. you should have enough privilege to create a database and grant privileges. That ensures that you can install a media wiki database.
  * apache web server (httpd) 2.0 or higher version has been installed and is running. the root directory is < WWW-ROOT >
  * PHP 5.0 or higher version has been installed. php-mysql, ... has been configured with apache web server.

2. [optional](optional.md) make sure if SVN client is installed if you plan to use SVN to install wiki.
to check SVN installation, type the following command in console
```
svn --version
```

# Installation #
## Step 1. Download/Install Files ##
1. download the bundle at http://code.google.com/p/smwbp/downloads/detail?name=smw-bundle-1.5.3.zip

2. unzip the bundle, and upload the files at your web server

## Step 2. Initialize MediaWiki Database ##
please follow [MW setup instructions](http://www.mediawiki.org/wiki/Manual:Config_script). Typically, you need to do the following:
```
bash# cd test1
bash# chmod a+w config/
...goto your wiki url and use web interface to configure your wiki...
...e.g. http://your.server/wiki/test1 in this case
...it is recommended to set database charset to "MySQL 4.1/5.0 UTF-8"
mv config/LocalSettings.php .
```


## Step 3. Configure MediaWiki LocalSettings.php ##
add the following code to the end of LocalSettings.php. The code provide common used configuration options for linked data deployment of semantic wiki
```
##############################################################
# customized configuration
##############################################################

## ##############################################################
# local look and feel [[optional, customization for this site]]
$wgLogo = "/images/logo-twc-logd-testbed.png";
$wgLocaltimezone = "America/New_York";
$wgLocalTZoffset = date("Z") / 60;

//allow very large upload
ini_set( 'memory_limit', '120M' );
ini_set( 'upload_max_filesize', '120M' );
ini_set( 'post_max_size:', '120M' );

## #######################################
# LDAP [optional, supporting TWC users login using their LDAP account]

require_once("$IP/extensions/LdapAuth/LdapAuthentication.php");
$wgAuth = new LdapAuthenticationPlugin();
$wgLDAPDomainNames = array(  "TWC","TWC(OLD)"  );
$wgLDAPServerNames = array(  "TWC" => "escience.rpi.edu", "TWC(OLD)"=>"onto.rpi.edu" );
$wgLDAPSearchStrings = array(   "TWC" => "uid=USER-NAME,ou=users,dc=tw,dc=rpi,dc=edu" , "TWC(OLD)" => "uid=USER-NAME,ou=people,dc=onto,dc=rpi,dc=edu" );
$wgLDAPEncryptionType = array(  "TWC" => "tls", "TWC(OLD)" => "sha" );
$wgLDAPLowerCaseUsername =array(  "TWC" => true, "TWC(OLD)" => false );

// required password length
$wgMinimalPasswordLength = 6;

//display debug information
// $wgLDAPDebug  = 10;

// Can user log in with a local account (non-ldap)?  no if not set
$wgLDAPUseLocal = true;  

// The default domain for users to login
$wgLDAPDefaultDomain = "TWC";


## ##############################################################
# mediawiki configuration [required]
require_once( "extensions/SMWBP/LocalSettings.smwbp.mw.php" );  #MW only

## ##############################################################
# semantic mediawiki configuration [required]
require_once( "extensions/SMWBP/LocalSettings.smwbp.smw.php" );  #SMW only
enableSemantics("logd.tw.rpi.edu");   # you need to update your.server.name with your server name

## ##############################################################
# enable MW/SMW extensions [optional, supporting wiki template programming]
require_once( "extensions/SMWBP/LocalSettings.smwbp.ext.php" );

```


## Step 4. Intialize Semantic MediaWiki Database ##
please follow [SMW setup instructions](http://semantic-mediawiki.org/wiki/Help:Installation). Typically you need to do the following:
```
login wiki with an administrator account
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
  * the database account for mediawiki should have enough previllege, i.e. "create table", "alter table" and "drop table" are required by SMW initialization
  * also see http://semantic-mediawiki.org/wiki/Help:Configuration