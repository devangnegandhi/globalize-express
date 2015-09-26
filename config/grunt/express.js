var path = require('path');

module.exports = function (grunt, opts) {
	'use strict';

	return {
		options: {
			output: 'listening at http:\/\/',
			delay: 10000
		},
		test: {
			options: {
				script: path.join(opts.exampleDir, 'index.js')
			}
		}
	};
};
