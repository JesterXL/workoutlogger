define(["hbs!com/jessewarden/workoutlogger/views/SetViewTemplate",
	"jquery",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/events/EventBus"],
	function(template,
	         $,
	         _,
	         Backbone
		)
	{
		var MainView = Backbone.View.extend({
			tagName: "div",

			events:
			{
			},

			initialize: function(args)
			{
				this.workoutSet = args.workoutSet;
				if(this.workoutSet != null)
				{
					this.render();
				}
			},

			render: function()
			{
				try
				{
					console.log("SetView::render");
					this.$el.html(template({
						workouts: this.workouts.toJSON()
					}));
				}
				catch(error)
				{
					console.error("MainView::render, error:", error);
				}
			},




		});
		return MainView;

	});
