part of workoutloggerlib;

@CustomTag('today-view')
class TodayView extends PolymerElement
{

	@published
	Workout workout;
	
	TodayView.created() : super.created();
}