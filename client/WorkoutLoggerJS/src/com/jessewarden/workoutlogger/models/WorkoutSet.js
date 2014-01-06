define(["underscore",
	"backbone",
	"com/jessewarden/workoutlogger/services/UpdateSetService"],
		function(_,
        Backbone,
        UpdateSetService
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
		},

		save: function()
		{
			console.log("WorkoutSet::save");
			if(this.updateSetService == null)
			{
				this.updateSetService = new UpdateSetService();
			}
			this.updateSetService.updateSet(this);
		}
	});

	return WorkoutSet;

});
