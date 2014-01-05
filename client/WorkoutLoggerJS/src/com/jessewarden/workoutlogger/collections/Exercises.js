define([
	"jquery",
	"underscore",
	"backbone",
	"json2",
	"com/jessewarden/workoutlogger/models/Exercise",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"moment"],
		function($,
                        _,
                        Backbone,
                        JSON,
                        Exercise,
                        ServicesLocator,
                        EventBus,
                        moment)
{
	var Exercises = Backbone.Collection.extend({

		model: Exercise

	});

	return Exercises;

});
