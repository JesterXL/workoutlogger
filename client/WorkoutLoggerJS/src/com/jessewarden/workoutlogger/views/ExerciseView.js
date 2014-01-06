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
				EventBus.on("SetView:onDeleteSet", this.onDeleteSet, this);
				this.setExercise(args.exercise);

			},

			render: function(event)
			{
				try
				{
					console.log("ExerciseView::render");
					this.$el.html(template(this.exercise.toJSON()));
					var exerciseID = this.exercise.get("id");
					var workoutSets = this.exercise.get("workoutSets");
					if(workoutSets.length > 0)
					{
						console.log("workoutSets.length:", workoutSets.length);
						var me = this;
						var setViewsContent = $('#exercise' + exerciseID);
						console.log("setViewsContent:", setViewsContent);
						workoutSets.each(function(workoutSet)
						{
							var setView = new SetView({
								workoutSet: workoutSet
							});
							//setViewsContent.append(setView.el);
							$(me.el).append(setView.el);
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
					this.exercise.on("all", this.onExerciseChanged, this);
					var sets = this.exercise.get("workoutSets");
					sets.on("all", this.onExerciseChanged, this);
					this.render();
				}
			},

			onExerciseChanged: function(event)
			{
				console.log("ExerciseView::onExerciseChanged, event:", event);
				this.render(event);
			},

			onAddSet: function()
			{
				console.log("ExerciseView::onAddSet");
				this.exercise.createNewSet();
			},

			onDeleteSet: function(event)
			{
				console.log("ExerciseView::onDeleteSet");
				this.exercise.deleteSet(event.workoutSet.id);
			}

		});
		return ExerciseView;

	});
