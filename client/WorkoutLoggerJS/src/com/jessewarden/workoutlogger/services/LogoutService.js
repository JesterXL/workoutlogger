define(["jquery",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/services/BaseService"], function($, ServicesLocator, EventBus, BaseService)
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
					me._onSuccess(data, me.onSuccess, me.onError);
				},
				error: function(errorStuff)
				{
					me._onError(errorStuff, me.onError);
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

	_.extend(LogoutService.prototype, BaseService);

	return LogoutService;

});
