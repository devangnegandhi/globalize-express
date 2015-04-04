var path = require('path');

module.exports = function () {
	'use strict';

	var opts = {};

	// Various local paths
	opts = {};
	opts.srcDir = 'src';
	opts.testDir = 'tests';
	opts.testFiles = path.join(opts.testDir, '**', '*.js');
	opts.configDir = path.join(process.cwd(), 'config');
	opts.coverageDir = 'build/reports/istanbul';

	// Create array of all js files
	opts.jsFilesArr = [
		'Gruntfile.js',
		opts.srcDir + '/**/*.js',
		opts.testDir + '/**/*.js',
		opts.configDir + '/**/*.js'
	];

	return opts;
};
