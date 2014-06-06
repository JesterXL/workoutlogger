part of workoutloggerlib;


class Workout
{
  String name;
  DateTime occurrence;
  String type = WorkoutTypes.DEFAULT;
  int totalTimeInMilliseconds;
  int averageTimeInMilliseconds;
  List<Exercise> exercises;
  
	Workout()
  {
    
  }

}