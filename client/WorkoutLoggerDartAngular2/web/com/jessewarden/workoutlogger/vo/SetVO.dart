part of workoutloggerlib;

class SetVO
{
  String name;
  bool goodForm;
  int reps;
  double weight;
  int goalReps;
  double goalWeight;
  
	SetVO({String name, bool goodForm, int reps, double weight, int goalReps, double goalWeight})
	{
		this.name = name;
		this.goodForm = goodForm;
		this.reps = reps;
		this.weight = weight;
		this.goalReps = goalReps;
		this.goalWeight = goalWeight;
	}
  
}