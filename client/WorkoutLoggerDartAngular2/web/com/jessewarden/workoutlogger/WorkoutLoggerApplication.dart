part of workoutloggerlib;

@Controller(selector: '[workout-logger-application]', publishAs: 'applicationController')
class WorkoutLoggerApplication
{
	RootScope rootScope;
	Router router;
	
	WorkoutLoggerApplication(this.rootScope, this.router)
	{
		print("WorkoutLoggerApplication::constructor");
		new Future.delayed(new Duration(seconds: 2), ()
				{
					router.go("login", {});
				});
	}
}