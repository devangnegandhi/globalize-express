# globalize-express Example
Example app to demonstrate the use of globalize-express with node and express

We assume you know what node's [Express](http://expressjs.com/) and [Mustache.js](https://github.com/janl/mustache.js/) (or any other similar templating engine) is.

The demo is composed of the following files:
```
.
├── index.js
├── config.js
├── views
    └── example_page.html
└── locales
    ├── de.json
    ├── en.json
    └── fr.json
```
## Run the demo
	cd <to-example-dir>
    npm install
    npm run start

### To view it in English
Simply go to http://localhost:3000/ on your browser after running the demo
- In this demo, you will see all the text is in english (Which is the default)
- You will also see the dates and numbers represented in the US english format

### To view it in French
Simply go to http://localhost:3000/?lang=fr on your browser after running the demo
- In this demo, you will see the HTML title and the page header in french.
- You will see an un-transalated string too - this was to demonstrate the fallback mechanism in globalize in case a transalation is not provided (see [this](https://github.com/jquery/globalize/blob/master/doc/api/message/load-messages.md#messages-inheritance) for more details)
- Also, you will see the date and numbers represented in the France-french format

### To view it in German
Simply go to http://localhost:3000/?lang=de on your browser after running the demo
- In this demo, you will see the HTML title and the page header in german.
- You will see an un-transalated string too - This was to demonstrate the fallback mechanism in globalize in case a transalation is not provided (see [this](https://github.com/jquery/globalize/blob/master/doc/api/message/load-messages.md#messages-inheritance) for more details)
- Also, you will see the date and numbers represented in the Germany-german format

**NOTE:** This example does not use browser cookies to select language, and hence we have to use the URL query string. But rest assured, if a cookies is present and is defined in the config file, it will pick it up.