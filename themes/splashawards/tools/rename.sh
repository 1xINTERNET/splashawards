#!/bin/bash

# Use this script to rename the theme
# At the root leve of the theme do ./tools/rename.sh xi_my_new_name

echo "Renaming to: $1 …"

echo "Renaming theme directory …"
cd ..
mv ./xi_starter_theme ./$1
cd ./$1

echo "Replacing name string in files …"
for f in package.json README.md xi_starter_theme.info.yml config/schema/xi_starter_theme.schema.yml xi_starter_theme.theme
do
  sed -i -e "s/xi_starter_theme/$1/g" $f
done

echo "Renaming theme files …"
mv xi_starter_theme.info.yml $1.info.yml
mv xi_starter_theme.libraries.yml $1.libraries.yml
mv xi_starter_theme.theme $1.theme
mv config/install/xi_starter_theme.settings.yml config/install/$1.settings.yml
mv config/schema/xi_starter_theme.schema.yml config/schema/$1.schema.yml

echo "Removing git repository link …"
rm -rf .git

echo "> Finished!\n(If you see no errors it should have been successful)\nDon\'t forget to run this to update your terminal:\ncd .. && cd $1"
