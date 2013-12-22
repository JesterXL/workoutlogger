import 'dart:html';
import 'com/jessewarden/workoutlogger/workoutloggerlib.dart';
import 'package:bootjack/bootjack.dart';

Element mainContent;
HttpRequest request;
String token;

GetTokenService getTokenService;

void main()
{
	Button.use();
	Dropdown.use();
	Tab.use();
//  mainContent = querySelector("#mainContent");
//  print(mainContent);
  
//  SetVO setTest = new SetVO();
//  print(setTest);  
//  getToken();
	
}



void getToken()
{
  print("getToken");
	
	getTokenService = new GetTokenService();
	getTokenService.getToken().then((ServiceEvent event)
	{
		login();
	});
}

void login()
{
  print("login");
	
	new LoginService().login(getTokenService.token, 
								"jessewarden", "jessewarden")
		.then((ServiceEvent event)
		{
			onLoginSuccess(event);
		})
		.catchError((ServiceEvent event)
		{
			onLoginError(event);
		});
  
}

void onLoginSuccess(_)
{
  print("onLoginSuccess");
}

void onLoginError(_)
{
  print("onLoginError");
}

