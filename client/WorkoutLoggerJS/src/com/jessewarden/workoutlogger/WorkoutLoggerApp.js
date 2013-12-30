define(["jquery", "com/jessewarden/workoutlogger/views/LoginView"], function($, LoginView)
{
	function WorkoutLoggerApp()
	{
		var body = $("#content");
		var loginView = new LoginView({el: body});
	}

	return WorkoutLoggerApp;

});
