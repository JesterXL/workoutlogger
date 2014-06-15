module.exports = function ( grunt )
{

	grunt.loadNpmTasks('grunt-dart2js');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-open');

	var userConfig = require('./build.config.js');

	var taskConfig = {

		copy: {
			dev: {
				src: [ '<%= app_files.dart %>',
					'<%= app_files.html',
					'<%= app_files.css'],
				dest: '<%= apache_dir %>',
				cwd: '.',
				expand: true
			},
			build: {
				src: [ '<%= app_files.js %>',
						'<%= app_files.html %>',
						'<%= app_files.css %>'],
				dest: '<%= build_dir %>',
				cwd: '.',
				expand: true
			}
		},

		clean: [
			'<%= build_dir %>',
			'<%= compile_dir %>'
		],

		dart2js: {
			options: {
				dart2js_bin: "/Applications/dart/dart-sdk/bin/dart2js"
			},
			compile: {
				files: {
					"<%= app_files.main_js %>": "<%= app_files.main_dart %>"
				}
			}
		},

		open : {
			dev: {
				path: '<%= apache_url %>',
				app: 'Chromium'
			},

			build: {
				path: '<%= apache_url %>'
			}
		}
	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	grunt.registerTask('default', ['copy:dev', 'open:dev']);
	grunt.registerTask('build', ['dart2js', 'copy:build', 'open:build'])

};
