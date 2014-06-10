module.exports = function ( grunt )
{

	grunt.loadNpmTasks('grunt-dart2js');

	var taskConfig = {
		dart2js: {
			options: {
				dart2js_bin: "/Applications/dart/dart-sdk/bin/dart2js"
			},
			main: {
				src: ['web/workoutloggerdartangular2.dart'],
				dest: 'build'
			}

		}
	};

	grunt.initConfig(taskConfig);

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
