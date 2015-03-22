/**
 * @copyright Copyright (C) 2014 WanderingDesi.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
module.exports = function (grunt, opts) {
	return {
        unitTests: {
            src: opts.testFiles,
            options: {
				coverageFolder: opts.coverageDir,
				root: opts.srcDir,
				reportFormats: ['lcovonly', 'html']
            }
        }
	}
};