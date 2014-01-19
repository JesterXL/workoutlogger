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

			initialize: function(args)
			{
				this.setWorkoutSet(args.model);
			},

			render: function()
			{
				try
				{
					console.log("SetView::render");
					this.$el.html(template(this.model.toJSON()));
					var me = this;
					_.defer(function()
					{
						var workoutID = me.model.get("id");
						$("#deleteSetLink" + workoutID).click(function()
						{
							me.onDeleteSet();
						});

						var repsInput = $("#repsSetViewInput" + workoutID);
						repsInput.change(function()
						{
							me.onRepsChanged(repsInput[0]);
						});
						repsInput.keydown(function()
						{
							me.onRepsChanged(repsInput[0]);
						});
						var weightSetViewInput = $("#weightSetViewInput" + workoutID);
						weightSetViewInput.change(function()
						{
							me.onWeightChanged(weightSetViewInput[0]);
						});
						weightSetViewInput.keydown(function()
						{
							me.onWeightChanged(weightSetViewInput[0]);
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
				console.log("SetView::setWorkoutSet, model:", workoutSet);
				this.model = workoutSet;
				if(this.model != null)
				{
					var me = this;
					this.saveModelChanges = _.throttle(function()
					{
						me.model.save();
					}, 3 * 1000);
					this.model.on("all", this.onWorkoutSetChanged, this);
					this.render();
				}
			},

			onDeleteSet: function()
			{
				console.log("onDeleteSet");
				EventBus.trigger("SetView:onDeleteSet", {model: this.model});
			},

			onWorkoutSetChanged: function(event)
			{
				console.log("SetView::onWorkoutSetChanged", event);
				//this.render();
			},

			onRepsChanged: function(repsInput)
			{
				console.log("SetView::onRepsChanged");
				var workoutID = this.model.get("id");
				var reps = parseInt(repsInput.value);
				console.log("workoutID:", workoutID);
				console.log("repsInput:", repsInput);
				console.log("reps:", reps);
				console.log("isnan:", isNaN(reps));
				if(isNaN(reps) == false)
				{
					this.model.set("reps", reps);
					this.saveModelChanges();
				}
			},

			onWeightChanged: function(weightInput)
			{
				console.log("SetView::onWeightChanged");
				var workoutID = this.model.get("id");
				var weight = parseInt(weightInput.value);
				console.log("workoutID:", workoutID);
				console.log("weightInput:", weightInput);
				console.log("weight:", weight);
				console.log("weight:", isNaN(weight));
				if(isNaN(weight) == false)
				{
					this.model.set("weight", weight);
					this.saveModelChanges();
				}
			}

		});
		return SetView;

	});
