define([], function()
{

	var WorkoutTypes = {
		DEFAULT: "Default",
		SHOULDERS: "Shoulders",
		CHEST_AND_TRIS: "Chest And Tris",
		LEGS: "Legs",
		BACK_AND_BIS: "Back And Bis",
		RUN: "Run"
	};

	WorkoutTypes.workoutTypes = [
		{type: WorkoutTypes.DEFAULT},
		{type: WorkoutTypes.SHOULDERS},
		{type: WorkoutTypes.CHEST_AND_TRIS},
		{type: WorkoutTypes.LEGS},
		{type: WorkoutTypes.BACK_AND_BIS},
		{type: WorkoutTypes.RUN}
	];
	return WorkoutTypes;

});