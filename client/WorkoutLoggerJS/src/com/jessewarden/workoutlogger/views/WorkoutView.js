define(["hbs!com/jessewarden/workoutlogger/views/WorkoutViewTemplate",
	"jquery",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/views/ExerciseView",
	"com/jessewarden/workoutlogger/views/SetView"], function(template,
                                                             $,
                                                                  _,
                                                                  Backbone,
                                                                  EventBus,
                                                                  ExerciseView,
                                                                  SetView
	)
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
					var exercisesJSON = exercises.toJSON();
					workoutJSON.exercises = exercisesJSON;
					this.$el.html(template(workoutJSON));
					var mainDiv = $('.panel-body');
					var me = this;
					var counter = -1;
					exercises.each(function(exercise)
					{
						counter++;
						var exerciseView = new ExerciseView({exercise: exercise});
						mainDiv.append(exerciseView.el);
					});
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
