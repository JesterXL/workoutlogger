part of workoutloggerlib;

class WorkoutLoggerModule extends Module
{
    WorkoutLoggerModule()
    {
		bind(WorkoutLoggerApplication);
		bind(GetTokenService, toValue: new MockGetTokenService());
		bind(LoginService, toValue: new MockLoginService());
		bind(LoginView);
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
//    	router.root
//                ..addRoute(
//                    name: 'login',
//                    path: '/login',
//                    enter: views('login/login.tpl.html')
//                )
//                ..addRoute(
//                    name: 'today',
//                    path: '/today',
//                    enter: views('today/today.tpl.html')
//                );
    }
}
