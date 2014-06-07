part of workoutloggerlib;

class MockLoginService implements LoginService
{
	String token = "";
	
	Future login(String token, String username, String password)
	{
		print("MockLoginService::login");
		return new Future.delayed(new Duration(seconds: 2), ()
				{
					return new ServiceEvent(ServiceEvent.LOGIN_SUCCESS);
				});
	}
}
