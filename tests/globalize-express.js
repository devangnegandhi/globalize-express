
var fs = require('fs');
var mockery = require('mockery');
var sinon = require('sinon');
var expect = require("chai").expect;
var mockConfig = require('./mocks/mockConfig');
var globalizeExpress;

describe('globalize-express', function(){

	var globalizeStub,
		sandbox;

	before( function() {
		sandbox = sinon.sandbox.create();

		globalizeStub = sandbox
						.stub()
						.returns('someGlobalize');
		globalizeStub.load = sandbox.stub();
		globalizeStub.loadMessages = sandbox.stub();
	});

	beforeEach( function() {
		mockery.enable();
		mockery.registerMock('globalize', globalizeStub);
		mockery.registerAllowable('fs');
		mockery.registerAllowable('path');
		mockery.registerAllowable('../src/globalize-express');
		mockery.registerAllowable('../tests/mocks/mockData');
		mockery.registerAllowable('./mocks/mockRequire');
		mockery.registerAllowable(require.resolve(mockConfig.directory + '/mockLocale.json'));
		mockery.registerAllowable(require.resolve(mockConfig.directory + '/subdir/anotherMockLocale.json'));

		globalizeExpress = require('../src/globalize-express');
	});

	describe('config', function() {
		var sandbox ;

		it('should load up fine', function() {
			globalizeExpress(mockConfig);

			expect(globalizeStub.load.getCall(0).args[0]).to.equal("This is a mock!!");
			expect(globalizeStub.loadMessages.getCall(0).args[0].type).to.equal("mock");
			expect(globalizeStub.loadMessages.getCall(1).args[0].type).to.equal("another mock");
		});

	});

	describe('using the middleware', function() {
		var reqStub, 
			resStub, 
			nextStub,
			globalizeMiddleware,
			middlewareSandbox;

		beforeEach( function() {
			reqStub = sandbox.stub();
			reqStub.query = sandbox.stub();
			reqStub.cookies = sandbox.stub();
			reqStub.headers = sandbox.stub();
			resStub = sandbox.stub();
			nextStub = sandbox.stub();

			reqStub.query.lang = undefined;
			reqStub.cookies[mockConfig.cookieName] = undefined;
			reqStub.headers['accept-language'] = undefined;

			middlewareSandbox = sinon.sandbox.create();
		});

		it('should use req.query.lang when available', function() {
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.query, "lang", 'es');

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(reqStub.locale).to.equal('es')
		});

		it('should use req.cookies[opts.cookieName] when available', function() {
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.cookies, mockConfig.cookieName, 'de');

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(reqStub.locale).to.equal('de')
		});

		it('should use req.headers["accept-language"] when available', function() {
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.headers, 'accept-language', 'fr,someheaderdata');

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(reqStub.locale).to.equal('fr')
		});

		it('should use the default when the language specified is not in the list of locales', function() {
			reqStub.query = undefined;
			reqStub.cookies = undefined;
			reqStub.headers = undefined;

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(reqStub.locale).to.equal(mockConfig.defaultLocale)
		});

		it('should assign the correct Globalize object to req', function () {
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.query, "lang", 'es');

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(reqStub.Globalize).to.exist;
		});

		it('should call next() when everything is done', function () {
			globalizeMiddleware = globalizeExpress(mockConfig);

			middlewareSandbox.stub(reqStub.query, "lang", 'es');

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(nextStub.callCount).to.equal(1);
		});

		afterEach(function() {
			middlewareSandbox.restore();
		});
	});

	describe('using the devMode', function() {

		it('should call load and load message twice on init', function() {
			globalizeStub.reset();
			globalizeStub.load.reset();
			globalizeStub.loadMessages.reset();

			reqStub = sandbox.stub();
			resStub = sandbox.stub();
			nextStub = sandbox.stub();
			mockConfig.devMode = true;

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(globalizeStub.load.callCount).to.equal(2);
			expect(globalizeStub.loadMessages.callCount).to.equal(4);
		});

		it('it should unload the globalize module', function() {

			reqStub = sandbox.stub();
			resStub = sandbox.stub();
			nextStub = sandbox.stub();
			mockConfig.devMode = true;

			globalizeMiddleware = globalizeExpress(mockConfig);

			globalizeMiddleware(reqStub, resStub, nextStub);

			expect(require.cache[require.resolve('globalize')]).to.not.exist
		});

	});

	afterEach( function() {
		mockery.deregisterAll();
    	mockery.disable();
		sandbox.restore();
	});
});