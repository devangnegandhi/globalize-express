
module.exports = function (grunt, opts) {
	return {
        eslint: {
            options: {
	            configFile: 'confug/eslint/eslint.json'
	        },
	        target: opts.jsFilesArr
        }
	}
};