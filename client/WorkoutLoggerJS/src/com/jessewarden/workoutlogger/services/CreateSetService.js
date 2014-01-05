define(["jquery",
	"underscore",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus"],
		function($,
		         _,
		         ServicesLocator,
		         EventBus
			)
{

	function CreateSetService()
	{
		this.createdWorkoutSet = null;
	}

	CreateSetService.prototype.createSet = function(workoutSet)
	{
		console.log("CreateSetService::createSet, workoutSet:", workoutSet);
		var me = this;
		this.createdWorkoutSet = null;
		var setJSON = {

		};
		$.ajax(
			{
				url: ServicesLocator.CREATE_SET,
				type: "POST",
				data: setJSON,
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

	CreateSetService.prototype.onSuccess = function(response)
	{
		console.log("CreateSetService::onSuccess");
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