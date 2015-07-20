var mockery = require('mockery');
var sinon = require('sinon');
var fs = require('fs');
var mockConfig = require('./mocks/mockConfig');
var globalizeExpress;

describe('globalize-express', function () {
	'use strict';

	var globalizeStub,
		sandbox;

	before(function () {
		sandbox = sinon.sandbox.create();

		globalizeStub = sandbox
						.stub()
						.returns('someGlobalize');
		globalizeStub.load = sandbox.stub();
		globalizeStub.loadMessages = sandbox.stub();
	});

	beforeEach(function () {
		mockery.enable();
		mockery.registerMock('globalize', globalizeStub);
		mockery.registerAllowable('fs');
		mockery.registerAllowable('kew');
		mockery.registerAllowable('path');
		mockery.registerAllowable('../src/globalize-express');
		mockery.registerAllowable('../tests/mocks/mockData');
		mockery.registerAllowable('./mocks/mockRequire');
		mockery.registerAllowable(require.resolve(mockConfig.directory + '/mockLocale.json'));
		mockery.registerAllowable(require.resolve(mockConfig.directory + '/subdir/anotherMockLocale.json'));

		globalizeExpress = require('../src/globalize-express');
	});

	describe('config', function () {
		var globalizeMiddleware;

		it('should load up fine', function (done) {
			var mockReq = {},
				mockRes = {};

			global.expectCount = 3;

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(mockReq, mockRes, function (err) {
				try {
					if (err) {
						throw err;
					}

					expect(globalizeStub.load.getCall(0).args[0]).to.equal('This is a mock!!');
					expect(globalizeStub.loadMessages.getCall(0).args[0].type).to.equal('mock');
					expect(globalizeStub.loadMessages.getCall(1).args[0].type).to.equal('another mock');

					done();
				} catch (e) {
					done(e);
				}
			});
		});
	});

	describe('using the middleware', function () {
		var globalizeMiddleware,
			middlewareSandbox,
			reqStub,
			resStub;

		beforeEach(function () {
			reqStub = sandbox.stub();
			reqStub.query = sandbox.stub();
			reqStub.cookies = sandbox.stub();
			reqStub.headers = sandbox.stub();
			resStub = sandbox.stub();

			reqStub.query.lang = null;
			reqStub.cookies[mockConfig.cookieName] = null;
			reqStub.headers['accept-language'] = null;

			middlewareSandbox = sinon.sandbox.create();
		});

		it('should use req.query.lang when available', function (done) {
			global.expectCount = 1;
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.query, 'lang', 'es');

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					if (err) {
						throw err;
					}

					expect(reqStub.locale).to.equal('es');

					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should use req.cookies[opts.cookieName] when available', function (done) {
			global.expectCount = 1;
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.cookies, mockConfig.cookieName, 'de');

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					if (err) {
						throw err;
					}

					expect(reqStub.locale).to.equal('de');

					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should use req.headers["accept-language"] when available', function (done) {
			global.expectCount = 1;
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.headers, 'accept-language', 'fr,someheaderdata');

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					if (err) {
						throw err;
					}

					expect(reqStub.locale).to.equal('fr');

					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should use the default when the language specified is not in the list of locales', function (done) {
			global.expectCount = 1;
			reqStub.query = null;
			reqStub.cookies = null;
			reqStub.headers = null;

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					if (err) {
						throw err;
					}

					expect(reqStub.locale).to.equal(mockConfig.defaultLocale);

					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should assign the correct Globalize object to req', function (done) {
			global.expectCount = 1;
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.query, 'lang', 'es');

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					if (err) {
						throw err;
					}

					/* eslint-disable no-unused-expressions */
					expect(reqStub.Globalize).to.exist;
					/* eslint-enable no-unused-expressions */

					done();
				} catch (e) {
					done(e);
				}
			});
		});

		afterEach(function () {
			middlewareSandbox.restore();
		});
	});

	describe('using the devMode', function () {
		it('should call load and load message twice on init and unload globalize', function (done) {
			var globalizeMiddleware,
				reqStub,
				resStub;

			global.expectCount = 4;

			globalizeStub.reset();
			globalizeStub.load.reset();
			globalizeStub.loadMessages.reset();

			reqStub = sandbox.stub();
			resStub = sandbox.stub();
			mockConfig.devMode = true;

			/* eslint-disable no-unused-expressions */
			expect(require.cache[require.resolve('globalize')]).to.exist;
			/* eslint-enable no-unused-expressions */

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					if (err) {
						throw err;
					}

					expect(globalizeStub.load.callCount).to.equal(2);
					expect(globalizeStub.loadMessages.callCount).to.equal(4);

					/* eslint-disable no-unused-expressions */
					expect(require.cache[require.resolve('globalize')]).to.not.exist;
					/* eslint-enable no-unused-expressions */

					done();
				} catch (e) {
					done(e);
				}
			});
		});

		afterEach(function () {
			mockConfig.devMode = false;
		});
	});

	describe('reading in invalid locale directory/file', function () {
		var globalizeMiddleware,
			mockLocaleSandbox,
			reqStub,
			resStub;

		beforeEach(function () {
			mockLocaleSandbox = sinon.sandbox.create();

			globalizeStub.reset();
			globalizeStub.load.reset();
			globalizeStub.loadMessages.reset();

			reqStub = sandbox.stub();
			resStub = sandbox.stub();
		});

		it('should pass an error to next() on invalid locale directory', function (done) {
			global.expectCount = 3;

			mockLocaleSandbox.stub(mockConfig, 'directory', './invalid/directory/');

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					/* eslint-disable no-unused-expressions */
					expect(err).to.exist;
					/* eslint-enable no-unused-expressions */

					expect(globalizeStub.load.callCount).to.equal(1);
					expect(globalizeStub.loadMessages.callCount).to.equal(0);

					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should pass an error to next() on invalid locale file', function (done) {
			global.expectCount = 3;

			mockLocaleSandbox = sinon.stub(fs, 'readdir');
			mockLocaleSandbox.onCall(0).callsArgWith(1, null, ['./invalid/file']);
			// mockLocaleSandbox.onCall(1).callsArgWith(1, new Error('dummy'), ['./invalid/file']);

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					/* eslint-disable no-unused-expressions */
					expect(err).to.exist;
					/* eslint-enable no-unused-expressions */

					expect(globalizeStub.load.callCount).to.equal(1);
					expect(globalizeStub.loadMessages.callCount).to.equal(0);
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should pass an error to next() on invalid locale file in a sub directory', function (done) {
			global.expectCount = 3;

			mockLocaleSandbox = sinon.stub(fs, 'readdir');
			mockLocaleSandbox.onCall(0).callsArgWith(1, null, ['./subdir']);
			mockLocaleSandbox.onCall(1).callsArgWith(1, null, ['./invalid/file']);

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, function (err) {
				try {
					/* eslint-disable no-unused-expressions */
					expect(err).to.exist;
					/* eslint-enable no-unused-expressions */

					expect(globalizeStub.load.callCount).to.equal(1);
					expect(globalizeStub.loadMessages.callCount).to.equal(0);
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		afterEach(function () {
			mockLocaleSandbox.restore();
		});
	});

	afterEach(function () {
		mockery.deregisterAll();
		mockery.disable();
		sandbox.restore();
	});
});
