[![Build Status](https://img.shields.io/codeship/ac9f04d0-b318-0132-f2c3-7e1d8cf367b9/master.svg)](https://codeship.com/projects/70145)
[![Coverage Status](https://coveralls.io/repos/devangnegandhi/globalize-express/badge.svg?branch=master)](https://coveralls.io/r/devangnegandhi/globalize-express?branch=master)
[![Dependency Status](https://david-dm.org/devangnegandhi/globalize-express.svg)](https://david-dm.org/devangnegandhi/globalize-express)
[![devDependency Status](https://david-dm.org/devangnegandhi/globalize-express/dev-status.svg)](https://david-dm.org/devangnegandhi/globalize-express#info=devDependencies)

# globalize-express
The [globalize](https://github.com/jquery/globalize) middleware for the express framework

## Install

    npm install globalize-express

## Load

```javascript
// load modules
var express = require('express'),
    globalizeExpress = require("globalize-express");

```

##Using with Express.js

### Use as a middleware

```javascript
// Add as a middleware to your express app
var app = express();
app.use(globalizeExpress(config));

```

### List of configuration options

```javascript
var config = {
    // list of supported locales
    locales:['en', 'ja'],

    // locale chosen if the requested locales was not found in the 'locales' array
    defaultLocale: 'en',

    // A custom cookie name which may contain the locale to use
    cookieName: null,

    // location of all the locale json files on disk
    directory: __dirname + '/locales',

    // An array of cldr data to load into globalize
    // Checkout: https://github.com/jquery/globalize#2-cldr-content
    localeData: [
    ],

    // Set this to true if running in development mode. This will delete cache before every access for localized string
    devMode: false
};
```

### Inside Your Express View
The middleware adds a `Globalize` object to the `request` object of your app. You can use this as shown here:

```javascript
module.exports = {
    index: function(req, res) {
        res.render("index", {
            title: req.Globalize.formatMessage("My Site Title"),
            desc: req.Globalize.formatMessage("My Site Description")
        });
    }
};
```

For more info on the API for Globalize, checkout [jquery/Globalize](https://github.com/jquery/globalize)

#### What locale does the `Globalize` object use?
For every individual request that your express app receives, the `Globalize` object selects the locale in the following manner (and priority):

1. It looks for a `lang` query parameter in the URL (For example: `http://yoursite.com?lang=ja` would force the gloablize-express middleware to use japanese locale)
2. It then looks for a  cookie with the name `lang` in the browser cookie that was sent back (if you have configured cookies)
3. Finally, it auto-detects the client browser locale based on the `accept-language` header property.

Depending on what was found first, it uses that as its locale to return appropriate strings.

**NOTE**: if the locale selected was not in the `config.locales` array, then it will fall back to the `config.defaultLocale` locale

## Example
There is a working express.js example app provided in this repo. Please go through the [example/README.md](https://github.com/devangnegandhi/globalize-express/tree/master/example) file to see instructions on how to run the example.