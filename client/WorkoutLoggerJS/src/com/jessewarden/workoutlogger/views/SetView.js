define(["hbs!com/jessewarden/workoutlogger/views/SetViewTemplate",
	"jquery",
	"underscore",
	"backbone",
	"com/jessewarden/workoutlogger/events/EventBus"
],
	function(template,
	         $,
	         _,
	         Backbone,
	         EventBus
		)
	{
		var SetView = Backbone.View.extend({
			tagName: "div",

//			events:
//			{
//				"click #deleteSetLink": this.onDeleteSet
//			},

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
					var me = this;
					_.defer(function()
					{
						$("#deleteSetLink" + me.workoutSet.get("id")).click(function()
						{
							me.onDeleteSet();
						});
					});

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
					this.workoutSet.on("all", this.onWorkoutSetChanged, this);
					this.render();
				}
			},

			onDeleteSet: function()
			{
				console.log("onDeleteSet");
				EventBus.trigger("SetView:onDeleteSet", {workoutSet: this.workoutSet});
			},

			onWorkoutSetChanged: function(event)
			{
				console.log("SetView::onWorkoutSetChanged", event);
				this.render();
			}

		});
		return SetView;

	});
