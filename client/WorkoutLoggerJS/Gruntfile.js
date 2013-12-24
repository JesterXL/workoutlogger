module.exports = function(grunt)
{
//	var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
//		clean: ["build", "tests"],
//		mkdir:
//		{
//			all: {
//				options: {
//					create: ["build", "tests"]
//				}
//			}
//		},

		karma:
		{
			options:
			{
				files: [
					{pattern: 'unittests/*Spec.js', included: false},
					"unittests/main-unittests.js"
//					"src/unittests/*Spec.js"
				],
				runnerPort: 9999,
				singleRun: true,
				browsers: ["Chrome"],
				frameworks: ["jasmine", "requirejs"]
			},
			dev:
			{
				reporters: ["dots"]
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
//	grunt.loadNpmTasks('grunt-contrib-jasmine');
//	grunt.loadNpmTasks('grunt-contrib-clean');
//	grunt.loadNpmTasks('grunt-contrib-copy');
//	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-karma');
//	grunt.loadNpmTasks('grunt-open');
//	grunt.loadNpmTasks('grunt-release');
//	grunt.loadNpmTasks('grunt-contrib-watch');
//	grunt.loadNpmTasks('grunt-conventional-changelog');

	// Default task(s).
	grunt.registerTask('default', ['karma']);
	grunt.registerTask('tests', ['karma', 'open']);

};