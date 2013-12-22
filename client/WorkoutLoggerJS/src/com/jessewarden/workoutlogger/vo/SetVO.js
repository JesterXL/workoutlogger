define([], function()
{

	function SetVO(name, goalReps, goalWeight, reps, weight, goodForm)
	{
		this.name       = name;
		this.goalReps   = goalReps;
		this.goalWeight = goalWeight;
		this.reps       = reps;
		this.weight     = weight;
		this.goodForm   = goodForm;
	}

	return SetVO;

});