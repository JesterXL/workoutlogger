module.exports = function(grunt)
{
	var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dart2js:
    {
    	options:
    	{
    		minify: false,
    		dart2js_bin: homeDir + "/Documents/sdks/dart-sdk/bin/dart2js"
    	},
		compile:
		{
			
		    files:
		    {
		    	"tests/workoutloggertests.js": "web/workoutloggertests.dart"
			}
		}
    },
    clean: ["build", "tests"],
    mkdir:
    {
    	all: {
		    options: {
				create: ["build", "tests"]
		    }
	  	}
	 },
	 
	 karma:
	 {
		options:
		{
			configFile: 'karma-unit.js'
		}
	},
	
	copy:
	{
		main:
		{
			files:
			[
				{expand: true, flatten: true, src: ['web/workoutloggertests.dart'], dest: 'tests/', filter: 'isFile'}
			]
		}
	},
	
	open:
	{
      dev:
      {
        path: "http://localhost:9100/web/workoutloggertests.html"
      }
    },

    karma:
    {
		options:
		{
			configFile: 'karma-unit.js'
		},
		unit: {
			runnerPort: 9100,
			background: true,
			port: 9018
		},
		continuous: {
			singleRun: true
		}
	},
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-dart2js');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'mkdir', 'dart2js']);
  grunt.registerTask('cleantests', ['clean', 'mkdir', 'dart2js', 'copy', 'karma', 'open']);
  grunt.registerTask('tests', ['copy', 'karma']);

};