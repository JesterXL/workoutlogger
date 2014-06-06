part of workoutloggerlib;

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
					document.cookie = "csrfCookie=" + tokenRequest.responseText;
					token = tokenRequest.responseText;
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