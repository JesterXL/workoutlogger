
import 'package:bootjack/bootjack.dart';
import 'package:angular/angular.dart';
import 'package:angular/application_factory.dart';
import 'package:logging/logging.dart';
import 'com/jessewarden/workoutlogger/workoutloggerlib.dart';

void main()
{
	Button.use();
	
	Module module = new Module();
	module.bind(WorkoutLoggerApplication);
	module.bind(GetTokenService, toValue: new MockGetTokenService());
	module.bind(LoginService, toValue: new MockLoginService());
	module.bind(LoginView);
	module.bind(LoginController);
	module.bind(RouteInitializerFn, toValue: configureRoutes);
	module.factory(NgRoutingUsePushState,
            (_) => new NgRoutingUsePushState.value(false));
  
	Logger.root.level = Level.FINEST;
    Logger.root.onRecord.listen((LogRecord r) { print(r.message); });
    
	applicationFactory()
		.addModule(module)
		.run();
}

void configureRoutes(Router router, RouteViewFactory views)
{
	print("configureRoutes");
  views.configure({
    'login': ngRoute(
        path: '/login',
        view: 'login/login.tpl.html'),
    'today': ngRoute(
        path: '/today',
        view: '/today/today.tpl.html')
  });
}