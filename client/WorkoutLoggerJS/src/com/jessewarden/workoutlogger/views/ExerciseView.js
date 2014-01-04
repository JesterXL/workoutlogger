define(["hbs!com/jessewarden/workoutlogger/views/ExerciseViewTemplate",
	"jquery",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/views/SetView"
],
	function(template,
	         $,
	         _,
	         Backbone,
	         EventBus,
	         SetView
		)
	{
		var ExerciseView = Backbone.View.extend({
			tagName: "div",

			events:
			{
			},

			initialize: function(args)
			{
				this.setExercise(args.exercise);
			},

			render: function()
			{
				try
				{
					console.log("ExerciseView::render");
					console.log("this.exercise:", this.exercise);
					this.$el.html(template(this.exercise.toJSON()));
					var workoutSets = this.exercise.get("workoutSets");
					if(workoutSets.length > 0)
					{
						var me = this;
						console.log("this.$el:", this.$el);
						var setViewsContent = $('#setViewsContent');
						console.log("workoutSets:", workoutSets);
						console.log("workoutSets.each:", workoutSets.each);
						workoutSets.each(function(workoutSet)
						{
							console.log("workoutSet:", workoutSet);
							console.log("SetView:", SetView);
							var setView = new SetView({
														workoutSet: workoutSet
													  });
							console.log("setViewsContent:", setViewsContent);
							console.log("setViewsContent.append:", setViewsContent.append);
							setViewsContent.append(setView.el);
						});
					}
				}
				catch(error)
				{
					console.error("ExerciseView::render, error:", error.message);
				}
			},

			setExercise: function(exercise)
			{
				console.log("ExerciseView::setExercise, exercise:", exercise);
				this.exercise = exercise;
				if(this.exercise != null)
				{
					this.render();
				}
			}

		});
		return ExerciseView;

	});
