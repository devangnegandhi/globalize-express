var sinon = require('sinon');
var chai = require('chai');

chai.use(function (chaiObj) {
	'use strict';
	chaiObj.Assertion.addMethod('withMessage', function (msg) {
		/* eslint-disable no-undef, no-invalid-this*/
		_.flag(this, 'message', msg);
		/* eslint-enable no-undef, no-invalid-this*/
	});
});

before(function () {
	'use strict';

	chai.config.showStack = true;
	global.expect = sinon.spy(chai, 'expect');
});

beforeEach(function () {
	'use strict';

	global.expect.reset();
	global.expectCount = -1;
});

afterEach(function () {
	'use strict';
	var count = global.expect.callCount;

	chai.expect(count, 'number of expect() calls failed to compare to expectCount').to.equal(global.expectCount);
});

after(function () {
	'use strict';

	global.expect.restore();
});
