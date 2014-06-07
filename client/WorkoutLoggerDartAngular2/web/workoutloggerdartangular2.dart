
import 'package:bootjack/bootjack.dart';
import 'package:angular/angular.dart';
import 'package:angular/application_factory.dart';
import 'package:logging/logging.dart';
import 'com/jessewarden/workoutlogger/workoutloggerlib.dart';

void main()
{
	Button.use();
	
	Logger.root.level = Level.FINEST;
    Logger.root.onRecord.listen((LogRecord r) { print(r.message); });
    
	applicationFactory()
		.addModule(new WorkoutLoggerModule())
		.run();
}
