define(["jquery",
	"com/jessewarden/workoutlogger/collections/Workouts",
	"com/jessewarden/workoutlogger/events/EventBus"], function($, Workouts, EventBus)
{
	describe("Workouts integration test", function()
	{
		"use strict";

		var collection;

		beforeEach(function()
		{
			collection = new Workouts();
		});

		afterEach(function()
		{
			collection = null;
		});

		it("successfully gets 4 workouts", function()
		{
			var flag;
			var me = this;
			runs(function()
			{
				flag = false;
				collection.on("change", function()
				{
					console.log("WorkoutsIntegrationSpec::change");
					flag = true;
				});
				collection.on("Workouts:error", function()
				{
					console.error("WorkoutsIntegrationSpec error'd");
				});
				collection.fetch({success: function()
				{
					console.log("WorkoutsIntegrationSpec::success");
					flag = true;
				},
				error: function()
				{
					console.error("WorkoutsIntegrationSpec::error");
					me.fail("Failed to connect to the server to get Workouts.");
				}});
			});


			waitsFor(function()
			{
				return flag;
			}, "getting all the workouts", 1 * 1000);

			runs(function()
			{
				expect(collection.length).toBe(5);
			});
		});


	});
});