var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/Spec\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '/base/src',

	paths: {
		"underscore": "../bower_components/underscore/underscore",
		"backbone": "../bower_components/backbone/backbone",
		"jquery": "../bower_components/jquery/jquery",
		"json2": "../bower_components/json2/json2",
		"moment": "../bower_components/momentjs/moment"
	},

	shim: {
		'json2': {
			exports: "JSON"
		},
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: "$"
		},
		'backbone': {
			exports: "Backbone"
		}
	},

	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});