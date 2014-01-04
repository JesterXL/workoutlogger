define(["jquery",
	"underscore",
	"json2",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/models/Workout"], function($, _, JSON, ServicesLocator, EventBus, Workout)
{

	function GetWorkoutService()
	{
		this.workout = null;
	}

	GetWorkoutService.prototype.getWorkout = function(workoutID)
	{
		console.log("GetWorkoutService::getWorkout, workoutID:", workoutID);
		this.workout = null;
		var me = this;
		$.ajax(
			{
				url: ServicesLocator.GET_WORKOUT + "/" + workoutID,
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

	GetWorkoutService.prototype.onSuccess = function(response)
	{
		console.log("GetWorkoutService::onSuccess");
		console.log("response:", response);
		if(response && response.response == true && response.data != null)
		{
			var workoutObject = JSON.parse(response.data);
			this.workout = new Workout(workoutObject);
			EventBus.trigger("GetWorkoutService:success", {workout: this.workout});
		}
		else
		{
			this.dispatchError(data.error);
		}
	};

	GetWorkoutService.prototype.onError = function(error)
	{
		console.log("GetWorkoutService::onError");
		EventBus.trigger("GetWorkoutService:error");
		this.dispatchError(error.message);
	};

	GetWorkoutService.prototype.dispatchError = function(errorMessage)
	{
		console.log("GetWorkoutService::dispatchError, errorMessage:", errorMessage);
		EventBus.trigger("GetWorkoutService:error", {error: Error(errorMessage)});
	};

	return GetWorkoutService;

});