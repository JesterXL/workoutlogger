define(["jquery",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/views/LoginView",
			"com/jessewarden/workoutlogger/views/LoadingView"],
		function($,
		         EventBus,
		         LoginView,
				LoadingView)
{
	function WorkoutLoggerApp()
	{
		this.content = $("#content");
		EventBus.on("LoginView:login", this.onLogin, this);
		this.showLogin();
	}

	WorkoutLoggerApp.prototype.showLogin = function()
	{
		this.currentView = new LoginView({el: this.content});
	};

	WorkoutLoggerApp.prototype.showLoading = function()
	{
		this.currentView = new LoadingView({el: this.content});
	};

	WorkoutLoggerApp.prototype.onLogin = function(eventObject)
	{
		this.showLoading();
	};

	return WorkoutLoggerApp;

});
