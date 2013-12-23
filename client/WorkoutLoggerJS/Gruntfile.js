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
				files: ["src/unittests/BasicSpec.js"],
				runnerPort: 9999,
				singleRun: true,
				browsers: ["Chrome"],
				frameworks: ["jasmine"]
			},
			continuous:
			{
				singleRun: true,
				browsers: ["Chrome"]
			},
			dev:
			{
				reporters: "dots"
			},
			unit:
			{
				autoWatch: true,
				background: true
			}
		}

//		copy:
//		{
//			main:
//			{
//				files:
//					[
//						{expand: true, flatten: true, src: ['src/unittests/BasicTest.js'], dest: 'tests/', filter: 'isFile'}
//					]
//			}
//		},

//		open:
//		{
//			dev:
//			{
//				path: "http://localhost:9100/web/workoutloggertests.html"
//			}
//		},
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
	grunt.registerTask('tests', ['karma']);

};