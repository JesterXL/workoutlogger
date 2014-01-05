define(["hbs!com/jessewarden/workoutlogger/views/SetViewTemplate",
	"jquery",
	"underscore",
	"backbone"
],
	function(template,
	         $,
	         _,
	         Backbone
		)
	{
		var SetView = Backbone.View.extend({
			tagName: "div",

			events:
			{
			},

			initialize: function(args)
			{
				this.setWorkoutSet(args.workoutSet);
			},

			render: function()
			{
				try
				{
					console.log("SetView::render");
					this.$el.html(template(this.workoutSet.toJSON()));
				}
				catch(error)
				{
					console.error("SetView::render, error:", error);
				}
			},

			setWorkoutSet: function(workoutSet)
			{
				console.log("SetView::setWorkoutSet, workoutSet:", workoutSet);
				this.workoutSet = workoutSet;
				if(this.workoutSet != null)
				{
					this.render();
				}
			}

		});
		return SetView;

	});
