var path = require('path');

/**
 * Main Grunt configuration
 * @param  {Object} grunt The grunt objects
 */
module.exports = function (grunt) {
	'use strict';
	// Set port for selenium to listen on
	// process.env.SELENIUM_LAUNCHER_PORT = 4445;

	// measures the time each task takes
	require('time-grunt')(grunt);

	// load grunt config
	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'config', 'grunt'),
		init: true,
		data: require(path.join(process.cwd(), 'config', 'grunt', 'grunt_options.js'))(grunt),
		loadGruntTasks: {
			pattern: [
				'grunt-*',
				'intern'
			],
			config: require('./package.json'),
			scope: 'devDependencies'
		}
	});

	grunt.registerTask('lint', [
		'eslint'
	]);

	grunt.registerTask('test', [
		'mocha_istanbul',
		'express:test',
		'karma:funcTests',
		'express:test:stop'
	]);

	grunt.registerTask('verify', [
		'lint',
		'test'
	]);
};
