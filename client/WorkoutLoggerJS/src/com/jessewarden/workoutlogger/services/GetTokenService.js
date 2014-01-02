define(["jquery",
		"underscore",
		"com/jessewarden/workoutlogger/services/ServicesLocator",
		"com/jessewarden/workoutlogger/events/EventBus"], function($, _, ServicesLocator, EventBus)
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

	return GetTokenService;

});