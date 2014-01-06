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
						var workoutID = me.workoutSet.get("id");
						$("#deleteSetLink" + workoutID).click(function()
						{
							me.onDeleteSet();
						});
						var repsInput = $("#repsSetViewInput" + workoutID);
						repsInput.change(function()
						{
							me.onRepsChanged();
						});
						repsInput.keydown(function()
						{
							me.onRepsChanged();
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
					var me = this;
					this.saveRepsChange = _.throttle(function()
					{
						me.workoutSet.save();
					}, 3 * 1000);
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
			},

			onRepsChanged: function()
			{
				console.log("SetView::onRepsChanged");
				var workoutID = this.workoutSet.get("id");
				var repsInput = $("#repsSetViewInput" + workoutID)[0];
				var reps = parseInt(repsInput.value);
				console.log("workoutID:", workoutID);
				console.log("repsInput:", repsInput);
				console.log("reps:", reps);
				console.log("isnan:", isNaN(reps));
				if(isNaN(reps) == false)
				{
					this.workoutSet.set("reps", reps);
					this.saveRepsChange();
				}
			}

		});
		return SetView;

	});
