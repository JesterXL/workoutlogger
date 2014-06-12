part of workoutloggerlib;

class WorkoutLoggerModule extends Module
{
    WorkoutLoggerModule()
    {
		bind(WorkoutLoggerApplication);
		bind(GetTokenService, toValue: new MockGetTokenService());
		bind(LoginService, toValue: new MockLoginService());
//	    bind(GetTokenService);
//	    bind(LoginService);
		
		bind(LoginView);
		bind(DateCycle);
		bind(RoutineInput);
		
		bind(LoginController);
		bind(RouteInitializerFn, toValue: configureRoutes);
		bind(NgRoutingUsePushState, toFactory: (_) => new NgRoutingUsePushState.value(false));
    }
    
    void configureRoutes(Router router, RouteViewFactory views)
    {
    	print("configureRoutes");
      views.configure({
        'login': ngRoute(
            path: '/login',
            view: 'com/jessewarden/workoutlogger/login/login.tpl.html'),
        'today': ngRoute(
            path: '/today',
            view: 'com/jessewarden/workoutlogger/today/today.tpl.html')
      });
    }
}
