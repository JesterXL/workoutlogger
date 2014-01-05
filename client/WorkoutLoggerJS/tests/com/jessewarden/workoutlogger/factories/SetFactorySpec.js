define(["com/jessewarden/workoutlogger/factories/SetFactory",
		"com/jessewarden/workoutlogger/models/WorkoutSet"],
	function(SetFactory,
	         WorkoutSet
		)
{
	describe("SetFactory ", function()
	{
		"use strict";

		it("can parse JSON fixture to WorkoutSet", function()
		{
			var workoutSetJSON = {
				"id": 1,
				"good_form": true,
				"reps": 8,
				"weight": 25,
				"goal_reps": 9,
				"goal_weight": 30
			};
			var workoutSet = SetFactory.getWorkoutSetFromJSON(workoutSetJSON);
			expect(workoutSet).not.toBe(null);
			expect(workoutSet).not.toBe(undefined);
		});

		it("parsed WorkoutSet's properties are correct to fixture", function()
		{
			var workoutSetJSON = {
				"id": 1,
				"good_form": true,
				"reps": 8,
				"weight": 25,
				"goal_reps": 9,
				"goal_weight": 30
			};
			var workoutSet = SetFactory.getWorkoutSetFromJSON(workoutSetJSON);
			expect(workoutSet.get("id")).toBe(1);
			expect(workoutSet.get("goodForm")).toBe(true);
			expect(workoutSet.get("reps")).toBe(8);
			expect(workoutSet.get("weight")).toBe(25);
			expect(workoutSet.get("goalReps")).toBe(9);
			expect(workoutSet.get("goalWeight")).toBe(30);
		});

	});
});
