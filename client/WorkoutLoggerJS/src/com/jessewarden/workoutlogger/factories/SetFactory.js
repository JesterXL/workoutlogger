define([
	"json2",
	"com/jessewarden/workoutlogger/models/WorkoutSet",
	"com/jessewarden/workoutlogger/collections/WorkoutSets"],
		function(json,
		         WorkoutSet,
		         WorkoutSets
			)
{
	var SetFactory = {

		getWorkoutSetFromJSON: function(json)
		{
//			"id": self.id,
//			"good_form": self.good_form,
//			"reps": self.reps,
//			"weight": self.weight,
//			"goal_reps": self.goal_reps,
//			"goal_weight": self.goal_weight
			try
			{
				console.log("json.good_form:", json.good_form);
				var workoutSet = new WorkoutSet({
					id: json.id,
					goodForm: json.good_form,
					reps: json.reps,
					weight: json.weight,
					goalReps: json.goal_reps,
					goalWeight: json.goal_weight
				});
				return workoutSet;
			}
			catch(error)
			{
				console.error("SetFactory::getWorkoutSetFromJSON, error:" + error.message);
			}
			return null;
		}

//		goodForm: true,
//		reps: 0,
//		weight: 0,
//		goalReps: 0,
//		goalWeight: 0

	};

	return SetFactory;

});
