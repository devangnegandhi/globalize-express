var path = require('path');

module.exports = function (grunt, opts) {
	'use strict';
	// Add the default suite to the list of test files
	opts.unitTestFiles = [opts.unitTestFiles].concat(path.join('config', 'mocha', 'defaultSuite.js'));

	return {
		unitTests: {
			src: opts.unitTestFiles,
			options: {
				coverageFolder: opts.coverageDir,
				root: opts.srcDir,
				reportFormats: ['lcovonly', 'html'],
				check: {
					statements: 100,
					branches: 100,
					funcitons: 100,
					lines: 100
				}
			}
		}
	};
};
