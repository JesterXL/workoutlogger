import 'dart:html';
import 'com/jessewarden/workoutlogger/workoutloggerlib.dart';

Element mainContent;
HttpRequest request;
String token;

void main() {
  mainContent = querySelector("#mainContent");
//  print(mainContent);
  
//  SetVO setTest = new SetVO();
//  print(setTest);  
  getToken();
}



void getToken()
{
  print("getToken");
  String theURL = "http://localhost:8000/workoutapi/get_token";
  HttpRequest tokenRequest = new HttpRequest();
  
  tokenRequest.onReadyStateChange.listen((_)
      {
        if (tokenRequest.readyState == HttpRequest.DONE &&
            (tokenRequest.status == 200 || tokenRequest.status == 0)) {
            print("getToken response: " + tokenRequest.responseText);
            document.cookie = "csrfCookie=" + tokenRequest.responseText;
            token = tokenRequest.responseText;
            login();
        }
      });
  tokenRequest.open("GET", theURL);
  tokenRequest.send(); 
}

void login()
{
  print("login");
  String theURL = "http://localhost:8000/workoutapi/login_user";
//  Map<String, String> mapOfStringString = {"username": "jessewarden", "password": "jessewarden"};
  String jsonData = '{"username": "jessewarden", "password": "jessewarden"}';
  Map<String, String> headers = new Map();
  headers["X-CSRFToken"] = token;
  headers["Content-Type"] = "text/plain";
  headers["Accept"] = "text/plain";
  
  Map<String, String> data = new Map();
  data['username'] = "jessewarden";
  data['password'] = "jessewarden";
  
  HttpRequest.request(theURL, 
      method: "POST", 
      mimeType: "application/json", 
      requestHeaders: headers, 
      sendData: jsonData)
      .then(onLoginSuccess)
      .catchError(onLoginError);
  
}

void onLoginSuccess(_)
{
  print("onLoginSuccess");
}

void onLoginError(_)
{
  print("onLoginError");
}

