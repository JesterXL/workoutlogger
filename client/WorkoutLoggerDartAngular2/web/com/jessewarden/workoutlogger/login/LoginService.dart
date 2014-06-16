part of workoutloggerlib;

class LoginService
{
	String token;
	
	String getCookie(name)
	{
	    var cookieValue = null;
	    if (document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = cookies[i].trim();
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                // cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                cookieValue = cookie.substring(name.length + 1);
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}

	Future login(String token, String username, String password)
	{
		print("LoginService::login, token: $token, username: $username");
		print("document.cookie: " + document.cookie);
		// token = getCookie("csrftoken");
		print("token: $token");
		Completer<ServiceEvent> completer = new Completer<ServiceEvent>();
		try
		{

			

			

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

			Map<String, String> headers = new Map<String, String>();
			if(token != null && token != "")
			{
				theFormData["csrfmiddlewaretoken"] = token;
				theFormData["csrftoken"] = token;
				headers["X-CSRFToken"] = token;
				headers["Access-Control-Request-Headers"] = "x-csrftoken, content-type";
				headers["Access-Control-Request-Method"] = "POST";
				document.cookie = "csrftoken=" + token + "; domain=workoutlogger.com;";
			}

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
