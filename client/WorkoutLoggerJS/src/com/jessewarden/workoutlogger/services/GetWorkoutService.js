define(["jquery",
	"underscore",
	"json2",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/models/Workout",
	"com/jessewarden/workoutlogger/models/Exercise",
	"com/jessewarden/workoutlogger/collections/Exercises",
	"com/jessewarden/workoutlogger/collections/WorkoutSets",
	"com/jessewarden/workoutlogger/models/WorkoutSet"],
		function($,
		         _,
		         JSON,
		         ServicesLocator,
		         EventBus,
		         Workout,
		         Exercise,
		         Exercises,
		         WorkoutSets,
		         WorkoutSet
			)
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
		try
		{
			if(response && response.response == true && response.data != null)
			{
				var workoutObject = response.data;
				var exerciseList = [];
				_.each(workoutObject.exercises, function(exerciseObject)
				{

					var workoutSetList = [];
					_.each(exerciseObject.sets, function(setObject)
					{
						workoutSetList.push(new WorkoutSet({
							id: setObject.id,
							goodForm: setObject.good_form,
							reps: setObject.reps,
							weight: setObject.weight,
							goalReps: setObject.goal_reps,
							goalWeight: setObject.goal_weight
						}));
					});
					var workoutSets = new WorkoutSets(workoutSetList);
					exerciseList.push(new Exercise({
													id: exerciseObject.id,
													name: exerciseObject.name,
													workoutSets: workoutSets}))
				});
				var exercises = new Exercises(exerciseList);
				var workoutInitObject = {
					id: workoutObject.id,
					occurrence: workoutObject.occurrence,
					totalTimeInMilliseconds: workoutObject.total_time_in_milliseconds,
					type: workoutObject.type,
					name: workoutObject.name,
					exercises: exercises
				};
				//this.workout = new Workout(workoutInitObject);
				this.workout = new Workout(workoutInitObject);
				var me = this;
				_.delay(function()
				{
					EventBus.trigger("GetWorkoutService:success", {workout: me.workout});
				}, 100);
			}
			else
			{
				this.dispatchError(data.error);
			}
		}
		catch(error)
		{
			this.dispatchError(Error('parse error:' + error.toString()));
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