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
				"click #addSetButton": "onAddSet"
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
					this.$el.html(template(this.exercise.toJSON()));
					var workoutSets = this.exercise.get("workoutSets");
					if(workoutSets.length > 0)
					{
						var me = this;
						var setViewsContent = $('#setViewsContent');
						console.log("setViewsContent:", setViewsContent);
						workoutSets.each(function(workoutSet)
						{
							var setView = new SetView({
														workoutSet: workoutSet
													  });
							//setViewsContent.append(setView.el);
							setViewsContent.append("<b>Sup Man</b>");
						});
						console.log("ending setViewsContent:", setViewsContent);
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
					this.exercise.on("change", this.onExerciseChanged, this);
					this.exercise.on("add", this.onExerciseChanged, this);
					this.exercise.on("remove", this.onExerciseChanged, this);
					this.render();
				}
			},

			onExerciseChanged: function()
			{
				console.log("ExerciseView::onExerciseChanged");
				this.render();
			},

			onAddSet: function()
			{
				console.log("ExerciseView::onAddSet");
				this.exercise.createNewSet();
			}

		});
		return ExerciseView;

	});
