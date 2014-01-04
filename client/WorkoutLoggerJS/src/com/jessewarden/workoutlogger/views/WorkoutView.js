define(["hbs!com/jessewarden/workoutlogger/views/WorkoutViewTemplate",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/events/EventBus"], function(template,
                                                                  _,
                                                                  Backbone,
                                                                  EventBus)
{
	var WorkoutView = Backbone.View.extend({
		tagName: "div",

		workout: null,

		events:
		{
		},

		initialize: function(args)
		{
			this.workout = args.workout;
		},

		render: function()
		{
			try
			{
				console.log("WorkoutView::render");
//				this.$el.html(template({
//					workouts: this.workouts.toJSON()
//				}));
			}
			catch(error)
			{
				console.error("WorkoutView::render, error:", error);
			}
		}

	});
	return WorkoutView;

});
