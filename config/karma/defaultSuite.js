window.expect = chai.expect;

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
	window.expect = sinon.spy(chai, 'expect');
});

beforeEach(function () {
	'use strict';

	window.expect.reset();
	window.expectCount = -1;
});

afterEach(function () {
	'use strict';
	var count = window.expect.callCount;

	chai.expect(count, 'number of expect() calls failed to compare to expectCount').to.equal(window.expectCount);
});

after(function () {
	'use strict';

	FuncUnit.win.close();
	window.expect.restore();
});

// Karma and globalize specific loads
// Have to move all this to a karma pre-processor
before(function () {
	'use strict';

	var props = Object.getOwnPropertyNames(window.__json__).filter(function (prop) {
		return (typeof window.__json__[prop] !== 'function');
	});

	window.cldrData = [];
	window.locales = [];

	props.forEach(function (prop) {
		if (prop.indexOf('cldr-data') > 0) {
			window.cldrData.push(window.__json__[prop]);
		} else {
			window.locales.push(window.__json__[prop]);
		}
	});

	window.cldrData.forEach(function (data) {
		Globalize.load(data);
	});

	window.locales.forEach(function (locale) {
		Globalize.loadMessages(locale);
	});
});

after(function () {
	'use strict';
	var cookie,
		cookies = Cookies.get();

	for (cookie in cookies) {
		if (typeof cookie !== 'function') {
			Cookies.remove(cookie);
		}
	}
});
