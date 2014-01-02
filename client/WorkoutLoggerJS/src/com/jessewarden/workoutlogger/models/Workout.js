define(["underscore",
	"backbone",
	"com/jessewarden/workoutlogger/services/ServicesLocator"], function(_,
                          Backbone,
                          ServicesLocator
	)
{
	var WorkoutModel = Backbone.Model.extend({
		defaults:
		{
			user: null,
			name: null,
			occurrence: null,
			type: null,
			totalTimeInMilliseconds: null
		}
	});

	return WorkoutModel;

});
