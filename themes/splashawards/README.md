# splashawards

This is the Drupal 8 version of the 1xInternet starter theme.

**If you're looking for the D7 theme go here: https://bitbucket.org/1xbitbucket/xi_base_theme/overview**

It uses a watch system built on _gulp_ to run build and copy tasks and trigger livereloading.

## Getting started

#### How to install

```bash
# download the bootstrap Drupal theme, which is a dependency,
# skip this step if you already have it
# Note: You don't have to enable it!
$ drush dl bootstrap

# clone this repo into the xi directory and change into it
# Note: You have to be in /sites/all/themes/ for this
# Note: Use exactly this command, otherwise the theme will be downloaded
# to xi-starter-theme (not splashawards) and the rename task will not work
$ git clone git@bitbucket.org:1xbitbucket/xi-starter-theme-d8.git splashawards && cd splashawards

# install everything!
# (Note: you have to be in the theme directory for this to work)
$ npm install

# Rename the theme, this is required to prevent errors when
# using export/import of configurations with Drupal
# Configuration Synchronization tool
$ ./tools/rename.sh xi_my_new_cool_name
```


#### Common errors

**Error:** `ReferenceError: Set is not defined (…)`  
**Solution:** You have a version of node which does not support the new Set object. To get that you need to update the installed node version. Change to the root of the theme and call `./tools/update-node.sh`

**Error:** `Error: Missing binding (…) Node Sass could not find a binding for your current environment (…)`  
**Solution:** Your version of node has changed, this means you need an updated node-sass binary. You can get that by calling `npm rebuild node-sass`

#### Development tasks

To run the development task, run `npm start` (This will never change in future)

To format SASS code run `npm run sass:format`

Rename the theme via `./rename.sh my_new_cool_name`

**Note:** The `build` task (and with it the `dist` directory) has been removed.


#### Directory structure changes

Writing frontend code happens in the `source` directory (Previously `src`) – code gets compiled/copied to `public` from there. (__Never work in `public`!__)

Assets referenced in CSS should be relative, so when everything is compiled and copied the urls work just the same from within the `./public` directory.

#### Modules/libraries

###### JS libraries
We don't use bower anymore. Third party modules are now added exclusively as _npm_ modules.

We can include JS libs by using the node style `require('mymodulename')`. Our javascript build tool scans our _entry_ file (`main.js`) and parses any `require` statements, then it scans those files and their dependencies building a _dependency graph_ in the process. Then it

The bootstrap JS file is included via CDN to optimise page loading speed so you don't have to worry about that. Also jQuery is included on any page of the website by default.

Example of adding the _imagesloaded_ module:
```bash
# Install the module and save it as a dev dependency
$ npm install imagesloaded --save-dev
# start development task …
$ npm start
```

Then in our `./source/js/main.js`:
```javascript
const imagesLoaded = require('imagesloaded');

// the library is not automatically added as a jQuery plugin
// since it can also be used as a standalone library.
// To be able to use it as a plugin we have to do this:
// @see http://imagesloaded.desandro.com/#webpack
imagesLoaded.makeJQueryPlugin(window.jQuery);
```

###### SASS libraries
SASS files can be included in a similiar manner (if they have _eyeglass_ support) via `@import "mymodulename";`. (Or if they don't support eyeglass relatively `@import "../../../node_modules/mymodule/mymodulestyle.scss";`)



## Roadmap

#### Implemented so far:

* Drupal Bootstrap overrides in SASS
* Bootstrap SASS and custom `_variables.scss` file
* Advanced SASS file formatting (with _cssfmt_ and _csscomb_)
* SASS sourcemaps
* SASS code style linting
* Default SASS file/directory structure
* Autoprefixing of CSS properties for cross browser compatibility
* JS build system (with _webpack_/_browserify_)
* JS linting and code style checking (_eslint_)

#### Todo

* Theme renaming task (previously `grunt name`)