define(["jquery",
	"underscore",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus"], function($, _, ServicesLocator, EventBus)
{

	function LoggedInService()
	{
	}

	LoggedInService.prototype.loggedIn = function()
	{
		console.log("LoggedInService::loggedIn");
		var me = this;
		$.ajax(
			{
				url: ServicesLocator.LOGGED_IN,
				type: "GET",
				success: function(data, dataType, jqXHR)
				{
					me.onSuccess(data);
				},
				error: function(errorStuff)
				{
					me.onError(errorStuff);
				},
				contentType: "application/json"
			});
		return this;
	};

	// {"data": {"logged_in": true}, "response": true}
	LoggedInService.prototype.onSuccess = function(response)
	{
		console.log("LoggedInService::onSuccess");
		console.log("response:", response);
		try
		{
			if(response && response.response == true)
			{
				var me = this;
				var eventObject = {
					loggedIn: false
				};
				if(response.data && response.data.logged_in && response.data.logged_in == true)
				{
					eventObject.loggedIn = true;
				}
				_.delay(function()
				{
					EventBus.trigger("LoggedInService:success", eventObject);
				}, 100);
			}
			else
			{
				this.dispatchError(data.error);
			}
		}
		catch(err)
		{
			this.dispatchError(Error('unknown parse error:' + err.toString()));
		}
	};

	LoggedInService.prototype.onError = function(error)
	{
		console.error("LoggedInService::onError");
		EventBus.trigger("LoggedInService:error");
		this.dispatchError(error.message);
	};

	LoggedInService.prototype.dispatchError = function(errorMessage)
	{
//		console.log("LoggedInService::dispatchError, errorMessage:", errorMessage);
		EventBus.trigger("LoggedInService:error", {error: Error(errorMessage)});
	};

	return LoggedInService;

});