var fs = require('fs'),
	globalize = require('globalize'),
	path = require('path');

var	globalizeExpress;

/**
 * Load locale message into globalize
 * @param  {String} 	dir     The directory from where we load in the locale files
 * @param  {Boolean} 	devMode Is the env in development.
 */
function loadLocaleFiles (dir, devMode) {
	'use strict';

	// Read all files in the locale directory
	fs.readdirSync(dir).forEach(function (file) {
		var filename = path.join(dir, file);

		// If the file is a file and not a directory, then load it in
		if (fs.statSync(filename).isFile()) {
			// If we are in development env, then unload the existing locale
			// files from the requires cache.
			if (devMode) {
				delete require.cache[filename];
			}

			// Load the locale files one by one
			globalize.loadMessages(require(filename));

		// Else if the file is a directory, then read all the files in it
		} else {
			loadLocaleFiles(filename, devMode);
		}
	});
}

/**
 * Load in gloabalize locale data
 * @param  {Array} dataList List of all the locale data to load in
 */
function loadLocaleData (dataList) {
	'use strict';

	var i;

	for (i = 0; i < dataList.length; i++) {
		globalize.load(require(dataList[i]));
	}
}

/**
 * Unload the module from require's cache and all the modules
 * that depend on it
 * @param  {String} moduleName The name of the module to delete
 */
function unloadModule (moduleName) {
	'use strict';

	var key,
		modulePath = require.resolve(moduleName);

	// Delete the module from require's cache
	delete require.cache[modulePath];

	// Check all other keys in the cache if they were required by
	// this module. If they were, unload them too
	for (key in require.cache) {
		if (require.cache[key].parent) {
			// If the parent module is the same module we are unloading
			if (modulePath === require.cache[key].parent.id) {
				unloadModule(require.cache[key].id);
				delete require.cache[key];
			}
		}
	}
}

/**
 * Method to initialize the globalize object
 * @param  {Object}		opts 				Options for setting up localization
 * @param  {String[]}	opts.locales		An array of available locales (e.g ["en", "ch"])
 * @param  {String}		opts.defaultLocale	The default locale to fallback to
 * @param  {String} 	opts.cookieName 	The name of the cookie that stores locale info on the client
 * @param  {String} 	opts.directory 		The directory that contains all the locale files
 * @param  {Boolean} 	opts.devMode 		Is the webapp running in development mode or not
 * @return {Function}	An express compatible middleware method
 */
globalizeExpress = function (opts) {
	'use strict';
	var globalizeMiddleware;

	// Load the locale data from disk
	loadLocaleData(opts.localeData);

	// Load the locales from disk
	loadLocaleFiles(opts.directory);

	/**
	 * The middleware to setup localization
	 * @param  {Object}   req  The express request object
	 * @param  {Object}   res  The express response object
	 * @param  {Function} next The express next method
	 */
	globalizeMiddleware = function (req, res, next) {
		var locale = '';

		// If lang param is specified in the URL as a query, use that
		if (req.query && req.query.lang) {
			locale = req.query.lang;

		// Else if locale specified in the client cookie, use that
		} else if (req.cookies && opts.cookieName && req.cookies[opts.cookieName]) {
			locale = req.cookies[opts.cookieName];

		// Else if locale specified in the browser header, use that
		} else if (req.headers && req.headers['accept-language']) {
			locale = req.headers['accept-language'].split(',')[0];
		}

		// If the locale found is not in the list of available locales,
		// then fallback to the default locale
		if (opts.locales.indexOf(locale) === -1) {
			locale = opts.defaultLocale;
		}

		// If we are in the development mode, then reload all the messages
		// from the disk
		if (opts.devMode) {
			unloadModule('globalize');

			globalize = require('globalize');
			loadLocaleData(opts.localeData);
			loadLocaleFiles(opts.directory, opts.devMode);
		}

		// Assign globalize objects to the req object
		req.Globalize = globalize(locale);
		req.locale = locale;

		next();
	};

	return globalizeMiddleware;
};

module.exports = globalizeExpress;
