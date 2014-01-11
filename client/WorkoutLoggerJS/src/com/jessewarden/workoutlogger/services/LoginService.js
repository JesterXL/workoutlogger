define(["jquery",
	"json2",
	"underscore",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/services/BaseService"], function($, JSON, _, ServicesLocator, EventBus, BaseService)
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

		if(token == null)
		{
			throw new Error("LoginService::login, token cannot be null.");
		}

		if(username == null)
		{
			throw new Error("LoginService::login, username cannot be null.");
		}

		if(password == null)
		{
			throw new Error("LoginService::login, password cannot be null.");
		}

		var dataObject = {
			username: username,
			password: password
		};
		var dataObjectJSON = JSON.stringify(dataObject);
//		console.log("dataObject:", dataObject);
		console.log("dataObjectJSON:", dataObjectJSON);
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
					me._onSuccess(data, me.onSuccess, me.onError);
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
//					console.error("LoginService::error");
//					console.error(textStatus);
//					console.error(errorThrown);
					me._onError(errorThrown, me.onError);
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
			console.log("response:", response);
			if(response && response.response == true)
			{
				this.user = response.data;
				// [jwarden 1.2.2014] So sick of this catch getting errors further down the line.
				// Leads to wild goose chases and less helpful exception errors.
				_.delay(function()
				{
					EventBus.trigger("LoginService:success");
				}, 100);
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

	_.extend(LoginService.prototype, BaseService);

	return LoginService;

});