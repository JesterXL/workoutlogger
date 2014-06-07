part of workoutloggerlib;

class LoginService
{
	String token;
	
	Future login(String token, String username, String password)
	{
		Completer<ServiceEvent> completer = new Completer<ServiceEvent>();
		try
		{
	//		Map<String, String> json = new Map<String, String>();
	//		json['username'] = username;
	//		json['password'] = password;
			String jsonData = '{"username": "jessewarden", "password": "jessewarden"}';
			
			Map<String, String> headers = new Map<String, String>();
			headers["X-CSRFToken"] = token;
			headers["Content-Type"] = "text/plain";
			headers["Accept"] = "text/plain";
			
			HttpRequest.request(ServicesLocator.LOGIN, 
								method: "POST", 
								mimeType: "application/json", 
								requestHeaders: headers, 
								sendData: jsonData)
				.then((HttpRequest theRequest)
				{
					completer.complete(new ServiceEvent(ServiceEvent.LOGIN_SUCCESS));
				})
				.catchError((Error error)
				{
					completer.completeError(new ServiceEvent(ServiceEvent.LOGIN_ERROR));
				});
		}
		catch(error, stackTrace)
		{
			print(error);
			print(stackTrace);
			completer.completeError(new ServiceEvent(ServiceEvent.GET_TOKEN_ERROR));
		}
		
		return completer.future;
	}
}
