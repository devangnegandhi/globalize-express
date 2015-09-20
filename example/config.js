var config = {
    // list of supported locales
    locales:['en', 'fr', 'es'],

    // locale chosen if the requested locales was not found in the 'locales' array
    defaultLocale: 'en',

    // A custom cookie name which may contain the locale to use
    cookieName: null,

    // location of all the locale json files on disk
    directory: __dirname + '/locales',

    // An array of cldr data to load into globalize
    // Checkout: https://github.com/jquery/globalize#2-cldr-content
    localeData: [
        "cldr-data/supplemental/likelySubtags"
    ],

    // Set this to true if running in development mode. This will delete cache before every access for localized string
    devMode: false
};

module.exports = config;