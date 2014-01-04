define(["underscore",
	"backbone"], function(_,
                          Backbone
	)
{
	var Exercise = Backbone.Model.extend({
		defaults:
		{
			name: null,
			workoutSets: null
		}
	});

	return Exercise;

});
