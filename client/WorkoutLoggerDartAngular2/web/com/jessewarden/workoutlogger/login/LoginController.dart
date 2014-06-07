part of workoutloggerlib;

@Controller(selector: 'login-view', publishAs: 'loginController')
class LoginController
{
	
	String username = "";
	String password = "";
	GetTokenService getTokenService;
	LoginService loginService;
	RootScope rootScope;
	
	LoginController(RootScope rootScope, GetTokenService getTokenService, LoginService loginService)
	{
		print("LoginController::constructor");
		this.getTokenService = getTokenService;
		this.loginService = loginService;
		this.rootScope = rootScope;
	}
	
	void onLogin()
	{
		getTokenService.getToken()
		.then((ServiceEvent event)
			{
				return loginService.login(getTokenService.token, username, password);
			})
		.then((ServiceEvent event)
			{
				rootScope.emit("Login:success");
			});
	}
}