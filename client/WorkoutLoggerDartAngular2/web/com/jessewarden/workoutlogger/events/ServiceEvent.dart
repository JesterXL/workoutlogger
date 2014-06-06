part of workoutloggerlib;

class ServiceEvent
{
	static const String GET_TOKEN_SUCCESS = "getTokenSuccess";
	static const String GET_TOKEN_ERROR = "getTokenError";
	
	static const String LOGIN_SUCCESS = "loginSuccess";
	static const String LOGIN_ERROR = "loginError";
	
	String type;
	
	ServiceEvent(this.type);
}