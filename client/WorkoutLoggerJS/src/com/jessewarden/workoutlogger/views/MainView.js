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
			"click #workoutTypeDropdown": "onMenuClicked"
		},

		initialize: function(args)
		{
			this.render();
		},

		render: function()
		{
			try
			{
				console.log("MainView::render");
				var modelToRender = {workoutTypes: WorkoutTypes.workoutTypes};
				this.$el.html(template(modelToRender));
			}
			catch(error)
			{
				console.error("MainView::render, error:", error);
			}
		},

		onMenuClicked: function(event)
		{
			console.log("MainView::onMenuClicked, event:", event);
		}

	});
	return MainView;

});
