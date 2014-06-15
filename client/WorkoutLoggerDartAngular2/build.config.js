module.exports = {

	build_dir: '/www',
	compile_dir: 'bin',
	// apache_dir: "/Library/WebServer/Documents/workoutlogger",
	apache_dir: "/www",
	apache_url: "http://workoutlogger.com/#/login",

	app_files: {
		js: [ 'web/**/*.js',
			'web/**/*.deps',
			'web/**/*.map'],
		dart: ['web/**/*.dart'],
		html: [ 'web/**/*.html' ],
		css: ['web/**/*.css'],
		main_dart: 'web/workoutloggerdartangular2.dart',
		main_js: 'web/workoutloggerdartangular2.dart.js'
	}

};
