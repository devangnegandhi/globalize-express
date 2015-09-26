var path = require('path');

/**
 * Configuration for i18n-node module
 * @type {Object}
 */
var mockConfig = {
	// setup some locales - other locales default to en silently
	locales: ['en-IN', 'en', 'de', 'en-GB', 'fr', 'es'],

	// you may alter a site wide default locale
	defaultLocale: 'en-IN',

	// sets a custom cookie name to parse locale settings from - defaults to NULL
	cookieName: 'someCookieName',

	// where to store json files - defaults to './locales' relative to modules directory
	directory: path.join(__dirname, '/mockLocales'),

	// An array of locale data to load into globalize
	localeData: [
		'../tests/unit_tests/mocks/mockData'
	],

	// Set if running in development mode
	devMode: false
};

module.exports = mockConfig;
