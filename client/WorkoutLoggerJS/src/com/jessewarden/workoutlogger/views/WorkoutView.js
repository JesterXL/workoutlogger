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
			this.setWorkout(args.workout);
		},

		setWorkout: function(workout)
		{
			this.workout = workout;
			if(this.workout != null)
			{
				this.render();
			}
		},

		render: function()
		{
			try
			{
				console.log("WorkoutView::render, workout:", this.workout.toJSON());
				if(this.workout.get("exercises") != null)
				{
					var exercises = this.workout.get("exercises");
					var workoutJSON = this.workout.toJSON();
					workoutJSON.exercises = exercises.toJSON();
					this.$el.html(template(workoutJSON));
				}
				else
				{
					this.$el.html("Loading...");
				}
			}
			catch(error)
			{
				console.error("WorkoutView::render, error:", error);
			}
		}

	});
	return WorkoutView;

});
