define(["hbs!com/jessewarden/workoutlogger/views/MainViewTemplate",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/types/WorkoutTypes"], function(template,
                                                               _,
                                                               Backbone,
                                                               EventBus,
                                                               WorkoutTypes)
{
	var MainView = Backbone.View.extend({
		tagName: "div",

		errorObject: null,

		events:
		{
		},

		initialize: function(args)
		{
			this.render();
		},

		render: function()
		{
			console.log("MainView::render");
			var model = {workoutTypes: WorkoutTypes.workoutTypes};
			this.$el.html(template(model));
		}

	});
	return MainView;

});
