part of workoutloggerlib;

@Injectable()
class GetTokenService
{
	String token;
	
	Future getToken()
	{
		Completer<ServiceEvent> completer = new Completer<ServiceEvent>();
		try
		{
			HttpRequest tokenRequest = new HttpRequest();
			tokenRequest.onReadyStateChange.listen((_)
			{
				if (tokenRequest.readyState == HttpRequest.DONE &&
					(tokenRequest.status == 200 || tokenRequest.status == 0))
				{
					print("getToken response: " + tokenRequest.responseText);
					var jsonResponse = JSON.decode(tokenRequest.responseText);
					token = jsonResponse["data"]["token"];
					print("token: $token");
					print("document.cookie:" + document.cookie);
					// document.cookie = "csrftoken=" + token + "; domain=workoutlogger.com;";
					print("document.cookie: " + document.cookie);
					print("...we're done here.");
					completer.complete(new ServiceEvent(ServiceEvent.GET_TOKEN_SUCCESS));
				}
			});
			tokenRequest.onError.listen((_)
			{
				completer.completeError(new ServiceEvent(ServiceEvent.GET_TOKEN_ERROR));
			});
			tokenRequest.open("GET", ServicesLocator.GET_TOKEN);
			tokenRequest.send();
		}
		catch(error)
		{
			completer.completeError(new ServiceEvent(ServiceEvent.GET_TOKEN_ERROR));
		}
		return completer.future;
	}
}