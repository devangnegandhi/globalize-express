module.exports = function (grunt, opts) {
	'use strict';
	// Add the default suite to the list of test files
	opts.testFiles = [opts.testFiles].concat('config/mocha/defaultSuite.js');

	return {
		unitTests: {
			src: opts.testFiles,
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
