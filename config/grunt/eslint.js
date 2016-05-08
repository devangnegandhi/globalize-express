var path = require('path');

module.exports = function (grunt, opts) {
	'use strict';

	return {
		options: {
			configFile: path.join('config', 'eslint', 'eslint.json')
		},
		target: {
			src: opts.jsFilesArr
		}
	};
};
