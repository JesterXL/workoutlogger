define(["jquery",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/views/LoginView",
			"com/jessewarden/workoutlogger/views/LoadingView",
	"com/jessewarden/workoutlogger/views/MainView",
	"com/jessewarden/workoutlogger/services/GetTokenService",
	"com/jessewarden/workoutlogger/services/LoginService"],
		function($,
		         EventBus,
		         LoginView,
				LoadingView,
				MainView,
				GetTokenService,
				LoginService)
{
	function WorkoutLoggerApp()
	{
		this.token = null;
		this.username = null;
		this.password = null;

		this.currentView = null;
		this.loginView = null;
		this.loadingView = null;
		this.mainView = null;

		this.content = $("#content");

		EventBus.on("GetTokenService:error", this.onLoginError, this);
		EventBus.on("GetTokenService:success", this.onGetTokenSuccess, this);

		EventBus.on("LoginService:error", this.onLoginError, this);
		EventBus.on("LoginService:success", this.onLoginSuccess, this);

		this.showLogin();
	}

	WorkoutLoggerApp.prototype.showLogin = function(errorToShow)
	{
//		this.currentView = new LoginView({el: this.content, errorObject: {errorMessage: "You failed to login."}});
		console.log("WorkoutLoggerApp::showLogin, errorToShow:", errorToShow);
		if(this.loginView == null)
		{
			this.loginView = new LoginView({el: this.content, error: errorToShow});
		}
		else
		{
			this.loginView.setError(errorToShow);
		}
		EventBus.on("LoginView:login", this.onLogin, this);

		this.currentView = this.loginView;
	};

	WorkoutLoggerApp.prototype.showLoading = function()
	{
		if(this.loadingView == null)
		{
			this.loadingView =  new LoadingView({el: this.content});
		}
		else
		{
			this.loadingView.render();
		}
		this.currentView = this.loadingView;
	};

	WorkoutLoggerApp.prototype.onLogin = function(eventObject)
	{
		console.log("WorkoutLoggerApp::onLogin");
		this.username = eventObject.username;
		this.password = eventObject.password;

		this.showLoading();
		if(this.token == null)
		{
			new GetTokenService().getToken();
		}
		else
		{
			this.login();
		}
	};

	WorkoutLoggerApp.prototype.onGetTokenSuccess = function(eventObject)
	{
		console.log("WorkoutLoggerApp::onGetTokenSuccess");
		this.token = eventObject.token;
		this.login();
	};

	WorkoutLoggerApp.prototype.login = function()
	{
		new LoginService().login(this.token, this.username, this.password);
		this.username = null;
		this.password = null;
	};

	WorkoutLoggerApp.prototype.onLoginError = function(eventObject)
	{
		console.log("WorkoutLoggerApp::onLoginError");
		this.showLogin(eventObject.error);
	};

	WorkoutLoggerApp.prototype.onLoginSuccess = function()
	{
		console.log("WorkoutLoggerApp::onLoginSuccess, show main screen");
		this.showMainScreen();
	};

	WorkoutLoggerApp.prototype.showMainScreen = function()
	{
		console.log("WorkoutLoggerApp::showMainScreen");
		if(this.mainView == null)
		{
			this.mainView = new MainView({el: this.content});
		}
		this.currentView = this.mainView;
	};

//	WorkoutLoggerApp.prototype.showView = function(viewName)
//	{
//		if(viewName != this.currentView)
//		{
//			switch(viewName)
//			{
//				case "loginView":
//
//				case "loadingView":
//
//				case "mainView":
//			}
//		}
//	};


	return WorkoutLoggerApp;

});
