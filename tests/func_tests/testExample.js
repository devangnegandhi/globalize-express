var langs = ['en', 'fr', 'de'];

langs.forEach(function (lang) {
	'use strict';

	describe('Testing example app with url query param "lang" set to ' + lang, function () {
		var globalize;

		before(function () {
			globalize = Globalize(lang);
		});

		it('should show messages in ' + lang, function (done) {
			expectCount = 5;

			F.open('/app/?lang=' + lang, function () {
				F('#header').visible();

				expect(F('title').text()).to.equal(globalize.formatMessage('example/title'));
				expect(F('#header').text()).to.equal(globalize.formatMessage('example/welcome'));
				expect(F('#message').text()).to.equal(globalize.formatMessage('example/untransalated'));
				expect(F('#date').text()).to.equal(globalize.formatDate(new Date('August 5, 1987')));
				expect(F('#million').text()).to.equal(globalize.formatCurrency(1000000, 'USD'));

				done();
			});
		});
	});

	describe('Testing example app with "lang" cookies set to ' + lang, function () {
		var globalize;

		beforeEach(function () {
			Cookies.set('lang', lang);
			globalize = Globalize(lang);
		});

		it('should show messages in ' + lang, function (done) {
			expectCount = 5;

			F.open('/app/', function () {
				F('#header').visible();

				expect(F('title').text()).to.equal(globalize.formatMessage('example/title'));
				expect(F('#header').text()).to.equal(globalize.formatMessage('example/welcome'));
				expect(F('#message').text()).to.equal(globalize.formatMessage('example/untransalated'));
				expect(F('#date').text()).to.equal(globalize.formatDate(new Date('August 5, 1987')));
				expect(F('#million').text()).to.equal(globalize.formatCurrency(1000000, 'USD'));

				done();
			});
		});

		afterEach(function () {
			Cookies.remove('lang');
		});
	});
});
