define([], function()
{

	var WorkoutTypes = {
		DEFAULT: "Default",
		SHOULDERS: "Shoulders",
		CHEST_AND_TRIS: "Chest And Tris",
		LEGS: "Legs",
		BACK_AND_BIS: "Back And Bis",
		RUN: "Run",

		workoutTypes: [
			{type: this.DEFAULT},
			{type: this.SHOULDERS},
			{type: this.CHEST_AND_TRIS},
			{type: this.LEGS},
			{type: this.BACK_AND_BIS},
			{type: this.RUN}
		]
	};
	return WorkoutTypes;

});