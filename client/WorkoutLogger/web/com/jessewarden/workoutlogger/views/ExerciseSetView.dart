import '../workoutloggerlib.dart';
import 'package:polymer/polymer.dart';

@CustomTag('exerciseset-view')
class ExerciseSetView extends PolymerElement
{

//String name;
//bool goodForm;
//int reps;
//double weight;
//int goalReps;
//double goalWeight;

	@published
	SetVO setVO;
	
	ExerciseSetView.created() : super.created();
//	
	void ready()
	{
		setVO = new SetVO(name: 'Test Set',
							goodForm: true,
							reps: 10,
							weight: 10.0,
							goalReps: 10,
							goalWeight: 10.0);
	}
	
	void updateWeight()
	{
		print("updateWeight");
//		InputElement weightInput = $["weightInput"];
//		setVO.weight = double.parse(weightInput.value);
	}
	
	void updateReps()
	{
		print("updateReps");
//		InputElement repsInput = $["repsInput"];
//		setVO.weight = double.parse(repsInput.value);
	}
}