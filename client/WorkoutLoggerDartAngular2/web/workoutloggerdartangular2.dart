
import 'package:bootjack/bootjack.dart';
import 'package:angular/angular.dart';
import 'package:angular/application_factory.dart';
import 'com/jessewarden/workoutlogger/workoutloggerlib.dart';

void main()
{
	 Button.use();
   	  
   	  Module module = new Module();
   	  module.bind(GetTokenService, toValue: new MockGetTokenService());
   	  module.bind(LoginService, toValue: new MockLoginService());
   	  module.type(LoginView);
   	  module.type(LoginController);
	   	applicationFactory()
	            .addModule(module)
	            .run();
}
