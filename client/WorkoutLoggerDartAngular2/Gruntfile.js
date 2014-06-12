module.exports = function ( grunt )
{

	grunt.loadNpmTasks('grunt-dart2js');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	var BUILD_DIR = "build";

	var taskConfig = {

		copy: {
			main: {
				src: ['web/**/*.dart', 'web/**/*.html', 'web/**/*.css', '!**/packages/**'],
				dest: BUILD_DIR + "/"
			}
		},

		clean: {
			main: {
				src: BUILD_DIR
			}
		},

		dart2js: {
			options: {
				dart2js_bin: "/Applications/dart/dart-sdk/bin/dart2js"
			},
			main: {
				src: [BUILD_DIR + '/workoutloggerdartangular2.html'],
				dest: BUILD_DIR + '/workoutloggerdartangular2.html'
			}

		}
	};

	grunt.initConfig(taskConfig);

	grunt.registerTask('default', ['clean', 'copy', 'dart2js']);

//	grunt.loadNpmTasks('grunt-contrib-clean');
//	grunt.loadNpmTasks('grunt-contrib-copy');
//
//	var userConfig = require( './build.config.js' );
//
//	var taskConfig = {
//
//		copy: {
//			build_app_assets: {
//				files: [
//					{
//						src: [ '**' ],
//						dest: '<%= build_dir %>/assets/',
//						cwd: 'src/assets',
//						expand: true
//					}
//				]
//		},
//	};
};
