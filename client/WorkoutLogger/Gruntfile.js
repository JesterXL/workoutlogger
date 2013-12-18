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
	 }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-dart2js');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'mkdir', 'dart2js']);

};