define(["jquery",
		"com/jessewarden/workoutlogger/services/ServicesLocator",
		"com/jessewarden/workoutlogger/events/EventBus"], function($, ServicesLocator, EventBus)
{

	function GetTokenService()
	{
		this.token = null;
	}

	GetTokenService.prototype.getToken = function()
	{
		this.token = null;
		var me = this;
		$.ajax(
		{
			url: ServicesLocator.GET_TOKEN,
			success: function(data, dataType, jqXHR)
			{
//				console.log("GetTokenService::success, results:");
//				console.log("data:", data);
//				console.log("dataType:", dataType);
//				console.log("jqXHR:", jqXHR);
				me.onSuccess(data);
			},
			error: function(errorStuff)
			{
//				console.error("GetTokenService::error, stuff:", errorStuff);
				me.onError(errorStuff);
			},
			contentType: "application/json"
		});
	};

	GetTokenService.prototype.onSuccess = function(data)
	{
		EventBus.trigger("GetTokenService:success");
	};

	GetTokenService.prototype.onError = function(error)
	{
		EventBus.trigger("GetTokenService:error");
	};

	return GetTokenService;

});