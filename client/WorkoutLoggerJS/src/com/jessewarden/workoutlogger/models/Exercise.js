define(["underscore",
	"backbone",
	"com/jessewarden/workoutlogger/services/CreateSetService",
	"com/jessewarden/workoutlogger/services/DeleteSetService",
	"com/jessewarden/workoutlogger/models/WorkoutSet",
	"com/jessewarden/workoutlogger/events/EventBus"],
		function(_,
                  Backbone,
                  CreateSetService,
                  DeleteSetService,
                  WorkoutSet,
                  EventBus
	)
{
	var Exercise = Backbone.Model.extend({
		defaults:
		{
			name: null,
			workoutSets: null
		},

		createNewSet: function()
		{
			console.log("Exercise::createNewSet");
			var newSet = new WorkoutSet({
				goodForm: true,
				reps: 0,
				weight: 0,
				goalReps: 0,
				goalWeight: 0
			});
//			console.log("newSet:", newSet);
//			console.log("CreateSetService:", CreateSetService);
			if(this.createSetService == null)
			{
				this.createSetService = new CreateSetService();
				EventBus.on("CreateSetService:success", this.onCreateNewSetSuccess, this);
//				EventBus.on("CreateSetService:error", this.onCreateNewSetError, this);
			}
//			console.log("createSetService:", this.createSetService);
			var myID = this.get("id");
//			console.log("myID:", myID);
			this.createSetService.createSet(newSet, myID);
		},

		onCreateNewSetSuccess: function(event)
		{
			console.log("Exercise::onCreateNewSetSuccess");
			var sets = this.get("workoutSets");
			sets.add(this.createSetService.createdWorkoutSet);
		},

		deleteSet: function(setID)
		{
			console.log("Exercise::deleteSet, setID:", setID);
			if(this.deleteSetService == null)
			{
				this.deleteSetService = new DeleteSetService();
				EventBus.on("DeleteSetService:success", this.onDeleteSetSuccess, this);
			}
			this.deleteSetService.deleteSet(setID);
		},

		onDeleteSetSuccess: function(event)
		{
			console.log("Exercise::onDeleteSetSuccess, setID:", event.workoutSetID);
			var workoutSets = this.get("workoutSets");
			var workoutSet = workoutSets.findWhere({id: event.workoutSetID});
			workoutSets.remove(workoutSet);
		}
	});

	return Exercise;

});
