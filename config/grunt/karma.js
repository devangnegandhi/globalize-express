var path = require('path');

module.exports = function (grunt, opts) {
	'use strict';
	// Add the default suite to the list of test files
	// opts.unitTestFiles = [opts.unitTestFiles].concat('config/mocha/defaultSuite.js');

	return {
		options: {
			files: [
				'node_modules/jquery/dist/jquery.js',
				'node_modules/sinon/pkg/sinon.js',
				'node_modules/chai/chai.js',
				'node_modules/funcunit/dist/funcunit.js',
				'node_modules/js-cookie/src/js.cookie.js',
				'node_modules/cldrjs/dist/cldr.js',
				'node_modules/cldrjs/dist/cldr/**/*.js',
				'node_modules/globalize/node_modules/cldrjs/dist/cldr.js',
				'node_modules/globalize/node_modules/cldrjs/dist/cldr/**/*.js',
				'node_modules/globalize/dist/globalize.js',
				'node_modules/globalize/dist/globalize/message.js',
				'node_modules/globalize/dist/globalize/plural.js',
				'node_modules/globalize/dist/globalize/number.js',
				'node_modules/globalize/dist/globalize/currency.js',
				'node_modules/globalize/dist/globalize/date.js',
				'node_modules/globalize/dist/globalize/relative-time.js',
				'example/locales/**/*.json',

				'node_modules/cldr-data/supplemental/likelySubtags.json',
				'node_modules/cldr-data/supplemental/numberingSystems.json',
				'node_modules/cldr-data/supplemental/plurals.json',
				'node_modules/cldr-data/supplemental/ordinals.json',
				'node_modules/cldr-data/supplemental/currencyData.json',
				'node_modules/cldr-data/supplemental/timeData.json',
				'node_modules/cldr-data/supplemental/weekData.json',

				'node_modules/cldr-data/main/en/numbers.json',
				'node_modules/cldr-data/main/en/ca-gregorian.json',
				'node_modules/cldr-data/main/en/timeZoneNames.json',
				'node_modules/cldr-data/main/en/currencies.json',

				'node_modules/cldr-data/main/fr/numbers.json',
				'node_modules/cldr-data/main/fr/ca-gregorian.json',
				'node_modules/cldr-data/main/fr/timeZoneNames.json',
				'node_modules/cldr-data/main/fr/currencies.json',

				'node_modules/cldr-data/main/de/numbers.json',
				'node_modules/cldr-data/main/de/ca-gregorian.json',
				'node_modules/cldr-data/main/de/timeZoneNames.json',
				'node_modules/cldr-data/main/de/currencies.json',

				'config/karma/defaultSuite.js',
				opts.funcTestFiles
			],
			configFile: path.join('config', 'karma', 'karma.conf.js')
		},
		funcTests: {
		},
		debug: {
			singleRun: false
		}
	};
};
