define(["underscore",
	"backbone"], function(_,
                          Backbone)
{
	var CurrentWorkout = Backbone.Model.extend({

		defaults:
		{
			workout: null
		}


	});
	return CurrentWorkout;

});
