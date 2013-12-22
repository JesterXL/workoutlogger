define(["com/jessewarden/workoutlogger/services/ServicesLocator",
		"com/jessewarden/workoutlogger/events/EventBus"], function(ServicesLocator, EventBus)
{

	function GetTokenService()
	{
		this.token = null;
	}

	GetTokenService.prototype.getToken = function()
	{
		$.ajax(
		{
			url: ServicesLocator.GET_TOKEN,
			success: function(data, dataType, jqXHR)
			{
				console.log("GetTokenService::success, results:");
				console.log("data:", data);
				console.log("dataType:", dataType);
				console.log("jqXHR:", jqXHR);
			},
			error: function(errorStuff)
			{
				console.error("GetTokenService::error, stuff:", errorStuff);
			},
			contentType: "application/json"
		}).done(function()
		{
			EventBus.trigger("GetTokenService:success");
		});
	};

	return GetTokenService;

});