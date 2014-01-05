define(["jquery",
	"com/jessewarden/workoutlogger/services/CreateSetService",
	"com/jessewarden/workoutlogger/services/DeleteSetService",
	"com/jessewarden/workoutlogger/models/WorkoutSet",
	"com/jessewarden/workoutlogger/events/EventBus"],
		function($,
		         CreateSetService,
		         DeleteSetService,
		         WorkoutSet,
		         EventBus
			)
{
	describe("CreateSetService integration test", function()
	{
		"use strict";

		var createService;
		var deleteService;

		beforeEach(function()
		{
			createService = new CreateSetService();
			deleteService = new DeleteSetService();
		});

		afterEach(function()
		{
			createService = null;
			deleteService = null;
		});

		it("successfully creates and deletes the set", function()
		{

			var flag;
			var SET_ID = 999;
			var EXERCISE_ID = 1;

			var callback = {
				called: false,
				handleSuccess: function()
				{
					this.called = true;
					flag = true;
				},
				handleError: function()
				{
					expect(true).toBe(false);
				}
			};
			runs(function()
			{
				flag = false;
				EventBus.on("CreateSetService:success", callback.handleSuccess, callback);
				EventBus.on("CreateSetService:error", callback.handleError, callback);
				var workoutSet = new WorkoutSet({
					"id": SET_ID,
					"goodForm": true,
					"reps": 8,
					"weight": 25,
					"goalReps": 9,
					"goalWeight": 30
				});
				createService.createSet(workoutSet, EXERCISE_ID);
			});

			waitsFor(function()
			{
				return flag;
			}, "Failed to create the set", 2 * 1000);

			var deleteCallback = {
				called: false,
				handleSuccess: function()
				{
					this.called = true;
					flag = true;
				},
				handleError: function()
				{
					expect(true).toBe(false);
				}
			};
			runs(function()
			{
				expect(callback.called).toBe(true);
				expect(createService.createdWorkoutSet).not.toBe(null);

				flag = false;
				EventBus.on("DeleteSetService:success", deleteCallback.handleSuccess, deleteCallback);
				EventBus.on("DeleteSetService:error", deleteCallback.handleError, deleteCallback);
				createService.deleteSet(SET_ID);
			});
		});


	});
});