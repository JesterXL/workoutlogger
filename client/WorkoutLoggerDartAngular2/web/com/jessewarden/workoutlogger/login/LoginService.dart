part of workoutloggerlib;

class LoginService
{
	String token;
	
	Future login(String token, String username, String password)
	{
		print("LoginService::login, token: $token, username: $username");
		print("document.cookie: " + document.cookie);
		Completer<ServiceEvent> completer = new Completer<ServiceEvent>();
		try
		{

			Map<String, String> headers = new Map<String, String>();
			headers["X-CSRFToken"] = token;

//			HttpRequest.request(ServicesLocator.LOGIN,
//								method: "POST",
//								requestHeaders: headers,
//								sendData: jsonData,
//								withCredentials: true)
//				.then((HttpRequest theRequest)
//				{
//					completer.complete(new ServiceEvent(ServiceEvent.LOGIN_SUCCESS));
//				})
//				.catchError((Error error)
//				{
//					completer.completeError(new ServiceEvent(ServiceEvent.LOGIN_ERROR));
//				});
			Map<String, String> theFormData = new Map<String, String>();
			theFormData["username"] = "jessewarden";
			theFormData["password"] = "jessewarden";
			theFormData["csrfmiddlewaretoken"] = token;
			theFormData["csrftoken"] = token;

			HttpRequest.postFormData(ServicesLocator.LOGIN, 
										theFormData, 
										withCredentials: true, 
										requestHeaders: headers)
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
			print("LoginService::login, error: $error");
			print(stackTrace);
			completer.completeError(new ServiceEvent(ServiceEvent.GET_TOKEN_ERROR));
		}
		
		return completer.future;
	}
}
