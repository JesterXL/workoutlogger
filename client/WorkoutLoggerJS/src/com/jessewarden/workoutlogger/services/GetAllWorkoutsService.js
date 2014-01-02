define(["jquery",
	"underscore",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus"], function($, _, ServicesLocator, EventBus)
{

	function GetAllWorkoutsService()
	{
		this.workouts =
	}

	GetTokenService.prototype.getToken = function()
	{
		console.log("GetTokenService::getToken");
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
		return this;
	};

	GetTokenService.prototype.onSuccess = function(response)
	{
		console.log("GetTokenService::onSuccess");
		console.log("response:", response);
		if(response && response.response == true)
		{
			this.token = response.data.token;
			EventBus.trigger("GetTokenService:success", {token: this.token});
		}
		else
		{
			this.dispatchError(data.error);
		}
	};

	GetTokenService.prototype.onError = function(error)
	{
		console.log("GetTokenService::onError");
		EventBus.trigger("GetTokenService:error");
		this.dispatchError(error.message);
	};

	GetTokenService.prototype.dispatchError = function(errorMessage)
	{
		console.log("GetTokenService::dispatchError, errorMessage:", errorMessage);
		EventBus.trigger("GetTokenService:error", {error: Error(errorMessage)});
	};

	return GetTokenService;

});