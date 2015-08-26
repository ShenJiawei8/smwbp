  * from: Dan Brickley <danbri@danbri.org>
  * subject: [Semediawiki-user] Notes from fresh installation (macosx MAMP)
  * source: Semantic MediaWiki mailing list

```
I'm trying to set up SMW on a fresh MAMP (apache, mysql etc bundle) 
macosx laptop. Here are some notes. Basic mediawiki install went fine.

So I have MediaWiki 1.13.3 (December 15, 2008)

I checked latest SMW out of svn into extensions/ as suggested.

Tweaked [wikipath]/LocalSettings.php as suggested.

I hit problems with:

In your wiki, log in as a user with admin status and go to the page 
"Special:SMWAdmin"

First time I tried this, the 'Initialise or Upgrade' option showed only 
the following output:

[[
Setting up standard database configuration for SMW ...

Selected storage engine is "SMWSQLStore2" (or an extension thereof)

Setting up table `smw_ids` ...
]]

...and then it stopped. It gave no real indication of success or 
failure, or whether it was still running. Nothing obvious in logs 
either. I checked the database directly and didn't see any smw_* tables, 
so assumed after a while that it had failed.


So I try the alternative, using commandline scripts in maintainance/

Minor typo btw in extensions/SemanticMediaWiki/maintenance/SMW_setup.php
	'For security, provide credentials in Adminssetings.php'


My initial experience here was:
[[
  php SMW_setup.php

Setting up standard database configuration for SMW ...

Selected storage engine is "SMWSQLStore2" (or an extension thereof)

DB connection error: Can't connect to local MySQL server through socket 
'/var/mysql/mysql.sock' (2) (localhost)
]]

I had several theories here.

1. it was that macosx oddity where 'localhost' doesn't always work and 
numeric is needed
2. it was because MAMP uses nonstandard MySQL port
3. it wasn't finding my config

When I learned about AdminSettings.php and set up one of those, I 
thought I'd solved it. But no. Turns out to be the sockets path.

Solution:

	sudo mkdir -p /var/mysql/
	sudo ln -s /Applications/MAMP/tmp/mysql/mysql.sock /var/mysql/mysql.sock

Now both the Web-based and commandline SQL creation/management tools 
work, and the SQL error that was appearing on each wiki page has gone.


At this point, being an incorrigible skim-reader, I thought I was done 
and made an SMW Test page only for more dissapointment. I didn't do the 
second stage.

" Afterwards, activate the automatic data update ("Data repair and 
upgrade"). Note that the first step requires permissions to alter/create 
database tables, as explained in the above note. The second step takes 
some time; go to Special:SMWAdmin to follow its progress."

Suggestion: make this next step clearer in the Web UI.

"Data repair and upgrade" does not have the right meaning for a new user 
with a fresh system. Perhaps something like "initialisation"? And have a 
"next steps" or "you're nearly done - just xyz" message would be nice. 
When things have not gone as inspected I've found it hard to figure out 
the next step, even though here it seems the system must know exactly 
what is still to be done.

BTW I'm writing this as I run the updater. It shows a purple bar, and 
the mysterious message "104.4643%" under "Estimated progress of current 
update". Does this mean that it estimates that it has already finished? :)

I hit reload and it went away, I guess I'm ready to go now?

In Special:Version I see 'Semantic MediaWiki (Version 1.5c-SVN)' as 
parser hook, but only 'smwfSetupExtension' under Extension Functions. 
Reading http://semantic-mediawiki.org/wiki/Help:Installation I'm led to 
expect "Go to the Special:Version page and you should see Semantic 
MediaWiki (version nn) listed as a Parser Hook and several wfSMWXxxx 
functions listed as Extension Functions.". Is something wrong there?


So I'm at 'Testing your Installation' now,  ie. "Create a regular wiki 
page named "TestSMW", and in it enter the wiki text.".

I made TestSMW4 and pasted "Property test:  [[testproperty::Dummypage]]" 
in there. But I don't see any of the SMW-ish things the Installation 
docs tell me to expect.



So I look in extensions/SemanticMediaWiki/includes/SMW_Settings.php

I see:

$smwgShowFactbox = SMW_FACTBOX_HIDDEN; # hide always

I comment this out, uncomment

$smwgShowFactbox = SMW_FACTBOX_SHOWN;  # show always, buggy and not 
recommended

... and reload /wiki/index.php/Test_SMW

and wohoo, it works, I see a fact box.


So I experiment with this bit of the config.

$ = SMW_FACTBOX_SPECIAL
...this makes all pages return empty (not even boilerplate).

$smwgShowFactbox = SMW_FACTBOX_NONEMPTY; # seems the best option. Using 
this.



At this stage I see

"[1.3] Since SMW 1.3, the Factbox is hidden by default and will only 
appear. As a compensation, the toolbox (usually on the left below the 
search field) shows a link to Special:Browse. To use the display 
behaviour of the Factbox as it was before SMW 1.3, set $smwgShowFactbox 
= SMW_FACTBOX_NONEMPTY; The new link and the Factbox during editing can 
also be configured; see SMW_Settings.php for details." in the bottom of 
http://semantic-mediawiki.org/wiki/Help:Installation and realise that I 
probably just missed the link to the 'browse' option earlier, since I 
was expecting a big in-your-face factbox in the main part of the page.



OK so I seem to be up and running now. I'll go explore. Hope this 
doesn't seem too grumbly, just thought I'd keep notes on what it's like 
to install this when you don't really know what's what :)

cheers,

Dan

--
http://danbri.org/

```