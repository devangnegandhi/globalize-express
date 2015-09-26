var config = {
    // list of supported locales
    locales:['en', 'fr', 'de'],

    // locale chosen if the requested locales was not found in the 'locales' array
    defaultLocale: 'en',

    // A custom cookie name which may contain the locale to use
    cookieName: null,

    // location of all the locale json files on disk
    directory: __dirname + '/locales',

    // An array of cldr data to load into globalize
    // Checkout: https://github.com/jquery/globalize#2-cldr-content
    localeData: [
        "cldr-data/supplemental/likelySubtags",
        "cldr-data/supplemental/numberingSystems.json",
        "cldr-data/supplemental/currencyData.json",
        "cldr-data/supplemental/timeData.json",
        "cldr-data/supplemental/weekData.json",

        "cldr-data/main/en/numbers.json",
        "cldr-data/main/en/ca-gregorian.json",
        "cldr-data/main/en/timeZoneNames.json",
        "cldr-data/main/en/currencies.json",

        "cldr-data/main/fr/numbers.json",
        "cldr-data/main/fr/ca-gregorian.json",
        "cldr-data/main/fr/timeZoneNames.json",
        "cldr-data/main/fr/currencies.json",

        "cldr-data/main/de/numbers.json",
        "cldr-data/main/de/ca-gregorian.json",
        "cldr-data/main/de/timeZoneNames.json",
        "cldr-data/main/de/currencies.json"
    ],

    // Set this to true if running in development mode. This will delete cache before every access for localized string
    devMode: false
};

module.exports = config;