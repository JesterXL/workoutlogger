define([], function()
{

	var ServicesLocator = {

		GET_TOKEN: "http://localhost:8000/workoutapi/get_token",
		LOGIN: "http://localhost:8000/workoutapi/login_user",
		LOGOUT: "http://localhost:8000/workoutapi/logout_user"

	};
	return ServicesLocator;

});