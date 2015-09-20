# globalize-express Example
Example app to demonstrate the use of globalize-express with node and express

## Run example
	cd <to-example-dir>
    npm install
    npm run start

### To view it in English
Simply go to http://localhost:3000/ on your browser after starting the app
- In this demo, you will see all the text is in english (Which is the default)

### To view it in French
Simply go to http://localhost:3000/?lang=fr on your browser after starting the app
- In this demo, you will see the HTML title and the page header in french, but the content in english
- This was to demonstrate the fallback mechanism in globalize in case a transalation is not provided (see [this](https://github.com/jquery/globalize/blob/master/doc/api/message/load-messages.md#messages-inheritance) for more details)

### To view it in Spanish
Simply go to http://localhost:3000/?lang=es on your browser after starting the app
- In this demo, you will see the HTML title and the page header in spanish, but the content in english
- This was to demonstrate the fallback mechanism in globalize in case a transalation is not provided (see [this](https://github.com/jquery/globalize/blob/master/doc/api/message/load-messages.md#messages-inheritance) for more details)

**NOTE:** This example does not use browser cookies to select language, and hence we have to use the URL query string. But rest assured, if a cookies is present and is defined in the config file, it will pick it up.