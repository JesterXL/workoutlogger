define(["jquery",
	"json2",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus"], function($, JSON, ServicesLocator, EventBus)
{

	function LoginService()
	{
		this.user = null;
	}

	LoginService.prototype.login = function(token, username, password)
	{
		console.log("LoginService::login");
		this.user = null;
		var me = this;
		var dataObject = {
			username: username,
			password: password
		};
		var dataObjectJSON = JSON.stringify(dataObject);
//		console.log("dataObject:", dataObject);
//		console.log("dataObjectJSON:", dataObjectJSON);
		var headers = {};
		headers["X-CSRFToken"] = token;
		headers["Content-Type"] = "text/plain";
		headers["Accept"] = "text/plain";
		$.ajax(
			{
				url: ServicesLocator.LOGIN,
				data: dataObjectJSON,
				type: "POST",
				headers: headers,
				success: function(data, dataType, jqXHR)
				{
//					console.log("LoginService::success");
//					console.log("data:", data);
//					console.log("dataType:", dataType);
					me.onSuccess(data);
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
//					console.error("LoginService::error");
//					console.error(textStatus);
//					console.error(errorThrown);
					me.onError(errorThrown);
				},
				contentType: "application/json"


			});
		return this;
	};

	LoginService.prototype.onSuccess = function(response)
	{
		try
		{
			console.log("LoginService::onSuccess");
			if(response && response.response == true)
			{
				this.user = response.data;
				EventBus.trigger("LoginService:success");
			}
			else
			{
				if(response)
				{
					this.onError(Error(response.error));
				}
				else
				{
					this.onError(Error("unknown error"));
				}
			}
		}
		catch(error)
		{
			this.onError(Error("failed to parse the response object"));
		}
	};

	LoginService.prototype.onError = function(error)
	{
		console.error("LoginService::onError");
		console.error(error);
		if(error == "FORBIDDEN")
		{
			error = "CSRF verification failed. Request aborted.";
		}
		EventBus.trigger("LoginService:error", {error: Error(error)});
	};

	return LoginService;

});