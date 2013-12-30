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
		this.user = null;
		var me = this;
		var dataObject = {
			username: username,
			password: password
		};
		var dataObjectJSON = JSON.stringify(dataObject);
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
					console.log("LoginService::success");
					console.log("data:", data);
					console.log("dataType:", dataType);
					me.onSuccess(data);
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
					console.error("LoginService::error");
					console.error(textStatus);
					console.error(errorThrown);
					me.onError(errorThrown);
				},
				contentType: "application/json"


			});
	};

	LoginService.prototype.onSuccess = function(response)
	{
		try
		{
			this.user = response.data;
			console.log("EventBus:", EventBus);
			EventBus.trigger("LoginService:success");
		}
		catch(error)
		{
			console.error("parse error:", error);
			this.onError(Error("failed to parse the response object"));
		}
	};

	LoginService.prototype.onError = function(error)
	{
		console.error("LoginService::onError");
		console.error(error.toString());
		EventBus.trigger("LoginService:error");
	};

	return LoginService;

});