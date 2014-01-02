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
		currentWorkout: null,
		workouts: null,

		events:
		{
			"click #workoutTypeDropdown a": "onMenuClicked"
		},

		initialize: function(args)
		{
			this.currentWorkout = args.currentWorkout;
			this.workouts = args.workouts;
			var me = this;
			this.workouts.fetch(
				{success: function()
				{
					me.render();
				}
			});
		},

		render: function()
		{
			try
			{
				console.log("MainView::render");
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
			switch(mouseEvent.target.text)
			{

			}
		}


	});
	return MainView;

});
