define(["jquery",
		"underscore",
		"com/jessewarden/workoutlogger/services/ServicesLocator",
		"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/services/BaseService"], function($, _, ServicesLocator, EventBus, BaseService)
{

	function GetTokenService()
	{
		this.token = null;
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
				me._onSuccess(data, me.onSuccess, me.onError);
			},
			error: function(errorStuff)
			{
//				console.error("GetTokenService::error, stuff:", errorStuff);
				me._onError(errorStuff, me.onError);
			},
			contentType: "application/json"
		});
		return this;
	};

	GetTokenService.prototype.onSuccess = function(response)
	{
		console.log("GetTokenService::onSuccess");
//		console.log("response:", response);
		if(response && response.response == true)
		{
			this.token = response.data.token;
			var me = this;
			_.delay(function()
			{
				EventBus.trigger("GetTokenService:success", {token: me.token});
			}, 100);
		}
		else
		{
			this.dispatchError(data.error);
		}
	};

	GetTokenService.prototype.onError = function(error)
	{
		console.error("GetTokenService::onError");
		EventBus.trigger("GetTokenService:error");
		this.dispatchError(error.message);
	};

	GetTokenService.prototype.dispatchError = function(errorMessage)
	{
//		console.log("GetTokenService::dispatchError, errorMessage:", errorMessage);
		EventBus.trigger("GetTokenService:error", {error: Error(errorMessage)});
	};

	_.extend(GetTokenService.prototype, BaseService);

	return GetTokenService;

});