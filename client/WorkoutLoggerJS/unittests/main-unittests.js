var tests = [];
//console.log("window.__karma__.files:", window.__karma__.files);
for (var file in window.__karma__.files) {
	console.log("file:", file);
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/Spec\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

require.config({
	baseUrl: '/base/src',
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: "../bower_components/underscore-amd/underscore",
		backbone: "../bower_components/backbone-amd/backbone"
	},
	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: function()
	{
		console.log("sup");
		window.__karma__.start();
	}
});



//requirejs.config({
//	// Karma serves files from '/base'
//	baseUrl: '/base/src',
//
//	paths: {
//		'jquery': '../lib/jquery',
//		'underscore': '../lib/underscore',
//	},
//
//	shim: {
//		'underscore': {
//			exports: '_'
//		}
//	},
//
//	// ask Require.js to load these files (all our tests)
//	deps: tests,
//
//	// start test run, once Require.js is done
//	callback: window.__karma__.start
//});