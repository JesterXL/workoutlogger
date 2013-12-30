define(["jquery",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus"], function($, ServicesLocator, EventBus)
{

	function LogoutService()
	{
	}

	LogoutService.prototype.logout = function()
	{
		this.user = null;
		var me = this;
		$.ajax(
			{
				url: ServicesLocator.LOGOUT,
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
	};

	LogoutService.prototype.onSuccess = function(data)
	{
		EventBus.trigger("LogoutService:success");
	};

	LogoutService.prototype.onError = function(error)
	{
		console.error("LogoutService::onError");
		console.error(error);
		EventBus.trigger("LogoutService:error");
	};

	return LogoutService;

});
