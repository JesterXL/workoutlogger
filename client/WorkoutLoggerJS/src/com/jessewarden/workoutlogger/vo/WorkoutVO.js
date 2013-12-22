define([], function()
{

	function WorkoutVO(name, occurrence, workoutType, totalTimeInMilliseconds, averageTimeInMilliseconds, exercises)
	{
		this.name       = name;
		this.occurrence  = occurrence;
		this.workoutType    = workoutType;
		this.totalTimeInMilliseconds = totalTimeInMilliseconds;
		this.averageTimeInMilliseconds = averageTimeInMilliseconds;
		this.exercises    = exercises;
	}

	return WorkoutVO;

});