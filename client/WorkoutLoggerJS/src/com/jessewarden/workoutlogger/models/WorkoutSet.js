define(["underscore",
	"backbone"],
		function(_,
        Backbone
	)
{
	var WorkoutSet = Backbone.Model.extend({

		defaults:
		{
			goodForm: true,
			reps: 0,
			weight: 0,
			goalReps: 0,
			goalWeight: 0
		}
	});

	return WorkoutSet;

});
