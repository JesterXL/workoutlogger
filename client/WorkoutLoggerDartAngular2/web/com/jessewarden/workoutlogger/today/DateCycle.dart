part of workoutloggerlib;

@Component(selector: 'date-cycle', 
		publishAs: 'component', 
		templateUrl: "com/jessewarden/workoutlogger/today/datecycle.tpl.html",
		useShadowDom: false)
class DateCycle
{
	
	DateTime currentDate = new DateTime.now();
	Duration _oneDay = new Duration(days: 1);
	DateFormat formatter = new DateFormat("E d");
//	StreamController<String> changeControl = new StreamController<String>();
	
//	Stream<String> change;
//	DateTime get currentDate => _currentDate;
	
	DateCycle()
	{
		print("DateCycle::constructor");
//		change = changeControl.stream.asBroadcastStream();
	}
	
	void nextDay(MouseEvent event)
	{
		print("DateCycle::nextDay, $event");
		currentDate = currentDate.add(_oneDay);
		print("currentDate: $currentDate");
//		print(querySelector("#currentDateSpan").text);
//		querySelector("#currentDateSpan").text = currentDate.toString();
		
//		changeControl.add(_currentDate.toString());
		event.preventDefault();
	}
	
	void previousDay(MouseEvent event)
	{
		print("DateCycle::previousDay");
		currentDate = currentDate.subtract(_oneDay);
//		querySelector("#currentDateSpan").text = currentDate.toString();
//		changeControl.add(_currentDate.toString());
		event.preventDefault();
	}
}