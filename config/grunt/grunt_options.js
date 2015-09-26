var path = require('path');

module.exports = function () {
	'use strict';

	var opts = {};

	// Various local paths
	opts = {};
	opts.srcDir = 'src';
	opts.unitTestDir = path.join('tests', 'unit_tests');
	opts.funcTestDir = path.join('tests', 'func_tests');
	opts.unitTestFiles = path.join(opts.unitTestDir, '**', '*.js');
	opts.funcTestFiles = path.join(opts.funcTestDir, '**', '*.js');
	opts.exampleDir = 'example';
	opts.configDir = path.join(process.cwd(), 'config');
	opts.coverageDir = 'build/reports/istanbul';
	opts.locales = ['en', 'fr', 'en'];

	// Create array of all js files
	opts.jsFilesArr = [
		'Gruntfile.js',
		opts.srcDir + '/**/*.js',
		opts.unitTestDir + '/**/*.js',
		opts.funcTestDir + '/**/*.js',
		opts.configDir + '/**/*.js'
	];

	return opts;
};
