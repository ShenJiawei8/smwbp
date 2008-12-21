#!/bin/bash
###################################################
# usage
###################################################
if [ -z "$1" ]
then 
   echo "Example Usage"
   echo "setup-smwrpi install WIKI_DIR - install RPI extensions at the subdirectory named WIKI_DIR"
   echo "setup-smwrpi update WIKI_DIR - install RPI extensions at the subdirectory named WIKI_DIR"
   echo "by default, WIKI_DIR is mw13"
   exit
fi


###################################################
# configuration
###################################################
# configure your installation path
if [ -z "$2" ]
then 
   WIKI_DIR=mw13
else
   WIKI_DIR=$2
fi



###################################################
# call the other install
###################################################
./setup-smw.sh "$1" "$2"


###################################################
# Switch to extension directory
###################################################
cd $WIKI_DIR


###################################################
# MW Extensions
###################################################

# LdapAuth (http://www.mediawiki.org/wiki/Extension:LDAP_Authentication)
if [ $1 = "install" ]
then
  svn checkout http://smwbp.googlecode.com/svn/trunk/extensions/LdapAuth/
fi

if [ $1 = "update" ]
then
  svn update LdapAuth
fi

###################################################
# SMW Extensions
###################################################

# Semantic Drilldown (http://www.mediawiki.org/wiki/Extension:Semantic_Drilldown)
if [ $1 = "install" ]
then
  svn checkout http://svn.wikimedia.org/svnroot/mediawiki/trunk/extensions/SemanticDrilldown/
fi

if [ $1 = "update" ]
then
  svn update SemanticDrilldown
fi


# TetherlessMap (http://www.mediawiki.org/wiki/Extension:Tetherless_Map)
if [ $1 = "install" ]
then
  svn checkout http://smwbp.googlecode.com/svn/trunk/mediawiki/extensions/TetherlessMap/
fi

if [ $1 = "update" ]
then
  svn update TetherlessMap
fi
