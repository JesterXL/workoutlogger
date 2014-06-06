part of workoutloggerlib;

@Controller(selector: 'login-view', publishAs: 'loginController')
class LoginController
{
	
	String username = "";
	String password = "";
	
	LoginController(Scope scope)
	{
		print("LoginController::constructor");	
	}
	
	void onTest()
	{
		print("LoginController::onTest");
	}
}