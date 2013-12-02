part of workoutloggerlib;


class WorkoutVO
{
  String name;
  DateTime occurrence;
  String type = WorkoutTypes.DEFAULT;
  int totalTimeInMilliseconds;
  int averageTimeInMilliseconds;
  List<CircuitVO> circuits;
  
  WorkoutVO()
  {
    
  }

}