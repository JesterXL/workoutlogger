module.exports = function (karma)
{
	karma.set({

		basePath: ".",

		/**
		 * This is the list of file patterns to load into the browser during testing.
		 */
		files: [

			'tests/*.dart',
	      {pattern: '**/*.dart', watched: true, included: false, served: true},
	      'packages/browser/dart.js',
	      'packages/browser/interop.js'
		],

		// list of files to exclude
		// exclude: [],

		/**
		 * frameworks to use; by specifying `requirejs` we do not have to manually
		 * load them here in the config
		 */
		frameworks: [
			"dart-unittest"
		],

		plugins: [
			"karma-dart"
			// "karma-firefox-launcher",
			// "karma-chrome-launcher",
			// "karma-junit-reporter"
		],

		/**
		 * Compile any CoffeeScript files.
		 */
		// preprocessors: {
		// },

		/**
		 * How to report, by default.
		 */
		// reporters: ["dots","junit"],

		/**
		 * Create a report.
		 */
		// junitReporter: {
		// 	// will be resolved to basePath (in the same way as files/exclude patterns)
		// 	outputFile: "tests/unit-results.xml"
		// },

		// enable / disable colors in the output (reporters and logs)
		// colors: true,

		/**
		 * On which port should the browser connect, on which port is the test runner
		 * operating, and what is the URL path for the browser to use.
		 */
		// port: 9018,
		runnerPort: 9100,
		// urlRoot: "/",

		/**
		 * Disable file watching by default.
		 */
		autoWatch: false,

		/**
		 * The list of browsers to launch to test on. This includes only "Firefox" by
		 * default, but other browser names include:
		 *
		 * Firefox (DEFAULT)
		 * Chrome
		 * ChromeCanary
		 * Opera
		 * Safari (only Mac)
		 * PhantomJS
		 * IE (only Windows)
		 * process.env.TRAVIS
		 *
		 * Note that you can also use the executable name of the browser, like "chromium"
		 * or "firefox", but that these vary based on your operating system.
		 *
		 * You may also leave this blank and manually navigate your browser to
		 * http://localhost:9018/ when you're running tests. The window/tab can be left
		 * open and the tests will automatically occur there during the build. This has
		 * the aesthetic advantage of not launching a browser every time you save.
		 */
		// browsers: [
		// 	"Chromium"
		// ],

		// If browser does not capture in given timeout [ms], kill it
		// CLI --capture-timeout 5000
		captureTimeout: 8000,

		// report which specs are slower than 500ms
		// CLI --report-slower-than 500
		// reportSlowerThan: 500,

		// you can define custom flags
		// customLaunchers: {
		// 	chrome_without_security: {
		// 		base: "Chrome",
		// 		flags: ["--disable-web-security"]
		// 	}
		// }
	});
};

