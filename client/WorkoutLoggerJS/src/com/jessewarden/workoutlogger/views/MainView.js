define(["hbs!com/jessewarden/workoutlogger/views/MainViewTemplate",
	"jquery",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/types/WorkoutTypes",
	"com/jessewarden/workoutlogger/views/WorkoutView",
	"com/jessewarden/workoutlogger/services/GetWorkoutService"],
		function(template,
		         $,
				_,
				Backbone,
				EventBus,
				WorkoutTypes,
				WorkoutView,
				GetWorkoutService
	)
{
	var MainView = Backbone.View.extend({
		tagName: "div",

		errorObject: null,
		currentWorkout: null,
		workouts: null,
		workoutView: null,
		getWorkoutService: null,

		events:
		{
			"click #workoutsList a": "onMenuClicked"
		},

		initialize: function(args)
		{
			this.currentWorkout = args.currentWorkout;
			this.workouts = args.workouts;
		},

		render: function()
		{
			try
			{
				console.log("MainView::render");
                if(this.workouts && this.workouts.length < 1)
                {
                    console.log("no workouts, so calling fetch...");
                    var me = this;
                    this.workouts.fetch(
                        {success: function()
                            {
                                me.render();
                            }
                        });
                }
				this.$el.html(template({
					workouts: this.workouts.toJSON()
				}));
			}
			catch(error)
			{
				console.error("MainView::render, error:", error);
			}
		},

		onMenuClicked: function(mouseEvent)
		{
			console.log("mouseEvent.target.text:", mouseEvent.target.text);
			var clickedWorkout = this.workouts.findWhere({name: mouseEvent.target.text});
			this.setCurrentWorkout(clickedWorkout);
		},

		setCurrentWorkout: function(workout)
		{
			console.log("MainView::setCurrentWorkout, workout:", workout);
			this.currentWorkout = workout;
			if(workout.get("exercises") == null)
			{
				// get exercises first
				if(this.getWorkoutService == null)
				{
					this.getWorkoutService = new GetWorkoutService();
				}
				var me = this;
				EventBus.on("GetWorkoutService:success", function(eventObject)
				{
					if(eventObject.workout.get("exercises") != null)
					{
						me.currentWorkout.set({exercises: eventObject.workout.exercises});
						me.setCurrentWorkout(eventObject.workout);
					}
					else
					{
						console.error("MainView::setCurrentWorkout, got a workout from the server, but failed to get exercises for it.");
					}
				});
				this.getWorkoutService.getWorkout(workout.id);
			}

			if(this.workoutView == null)
			{
				this.workoutView = new WorkoutView({el: $('#workoutContent'), workout: workout});
			}
			else
			{
				this.workoutView.setWorkout(workout);
			}
		}


	});
	return MainView;

});
