define([
	"jquery",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/models/WorkoutSet"], function($,
                        _,
                        Backbone,
                        WorkoutSet)
{
	var WorkoutSets = Backbone.Collection.extend({

		model: WorkoutSet

	});

	return WorkoutSets;

});
