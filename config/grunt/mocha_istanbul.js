module.exports = function (grunt, opts) {

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
	}
};