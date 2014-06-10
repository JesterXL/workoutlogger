part of workoutloggerlib;

@Component(selector: 'routine-input', 
		publishAs: 'component', 
		templateUrl: "com/jessewarden/workoutlogger/today/routineinput.tpl.html",
		useShadowDom: false)
class RoutineInput
{
	
	@NgTwoWay('routine')
	Routine routine;
	
	RoutineInput()
	{
		print("RoutineInput::constructor");
	}
	
}