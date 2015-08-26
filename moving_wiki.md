# move images #
1. dump all images from wiki record
```
cd ONEWIKI
php maintenance/dumpUploads.php > list.txt
```

2. run a small bash script to copy all images to a temporary directory t.
```
vi copy.sh
chmod +x copy.sh
mkdir t
./copy.sh
```
the content of copy.sh is listed below
```
#!/bin/bash
# read a file line by line
while read line
do
 cp $line t
done < list.txt
```

3. import the images to another wiki, where 't' is the directory containing images
```
cd OTHERWIKI
php maintenance/importImages.php t
```
note: images in t's subdirectory will not be imported. unlike directly copying files, wike upload records (in database) will be created.