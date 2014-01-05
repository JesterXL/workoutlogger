define(["jquery",
	"underscore",
	"cookies",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/factories/SetFactory"],
		function($,
		         _,
		         Cookies,
		         ServicesLocator,
		         EventBus,
		         SetFactory
			)
{

	function CreateSetService()
	{
		this.createdWorkoutSet = null;
	}

	CreateSetService.prototype.createSet = function(workoutSet, exerciseID)
	{
		console.log("CreateSetService::createSet, workoutSet:", workoutSet);
		var me = this;
		this.createdWorkoutSet = null;
		var setJSON = workoutSet.toJSON();
		setJSON.exerciseID = exerciseID;
		var headers = {};
		headers["X-CSRFToken"] = Cookies.get("csrftoken");
		headers["Content-Type"] = "text/plain";
		headers["Accept"] = "text/plain";
		$.ajax(
			{
				url: ServicesLocator.CREATE_SET,
				type: "POST",
				data: JSON.stringify(setJSON),
				headers: headers,
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
			this.createdWorkoutSet = SetFactory.getWorkoutSetFromJSON(response.data);
			var me = this;
			_.delay(function()
			{
				EventBus.trigger("CreateSetService:success", {createdWorkoutSet: me.createdWorkoutSet});
			}, 100);
		}
		else
		{
			this.dispatchError(data.error);
		}
	};

	CreateSetService.prototype.onError = function(error)
	{
		console.error("CreateSetService::onError");
		EventBus.trigger("CreateSetService:error");
		this.dispatchError(error.message);
	};

	CreateSetService.prototype.dispatchError = function(errorMessage)
	{
//		console.log("CreateSetService::dispatchError, errorMessage:", errorMessage);
		EventBus.trigger("CreateSetService:error", {error: Error(errorMessage)});
	};

	return CreateSetService;

});