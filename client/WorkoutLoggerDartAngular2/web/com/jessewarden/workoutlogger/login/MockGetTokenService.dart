part of workoutloggerlib;

@Injectable()
class MockGetTokenService implements GetTokenService
{
	String token = "";
	
	Future getToken()
	{
		print("MockGetTokenService::getToken");
		return new Future.delayed(new Duration(seconds: 2), ()
				{
					return new ServiceEvent(ServiceEvent.GET_TOKEN_SUCCESS);
				});
	}
}