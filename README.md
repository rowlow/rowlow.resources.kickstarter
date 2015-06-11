# rowlow.resources.kickstarter
Giving you a quick start into Row Low, kickstarter is the perfect an initial setup for your project with all Row Low components. Row Low works perfectly with Normalize.css and therefore it is additionally included into kickstarter.

## Requirements
Working with Row Low's Kickstarter requires a small and easy to use technology stack and at least some knowledge in how to use it. 
* Node Package Manager
* Bower
* Gulp

## Install

1. Download/Clone the latest release of Row Low kickstarter
2. Install (nodeJS)[https://nodejs.org/] on your computer
2. Install ```bower``` packages
```
    $ bower install
```
3. Install ```node``` packages
```
    $ npm install
```
4. Install and run ```gulp``` to build your project
```
    $ npm install --global gulp
    $ gulp
```

## Folder Structure

```
    dist
    |`- assets
    |   `- css
    |   |   `- styles.min.js
    |   `- fonts
    |   `- img
    |   `- js
    |       `- plugins.min.js
    |       `- scripts.min.js
    |       `- vendor.min.js
    |`- index.html
    |
    src
    |`- assets
    |   `- fonts
    |   `- img
    |   `- js
    |   |   `- plugins
    |   |   `- scripts
    |   |   |   `- main.js
    |   |   `- plugins.js
    |   |   `- scripts.js
    |   |   `- vendor.js
    |   `- sass
    |       `- generic
    |       `- specific
    |       `- settings.scss
    |       `- styles.scss
    |`- index.html
    |
    bower.js
    |
    gulpfile.js
    |
    package.js
```

```gulp``` is used to build everything that is located in the ```src``` directory and move it to ```dist```. 

You don't have to follow the rules on how to split up your javascript and scss files. If you change this, please don't forget to edit your ```gulpfile```. 
