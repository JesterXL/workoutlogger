define([], function()
{

	var ServicesLocator = {

		GET_TOKEN: "http://localhost:8000/workoutapi/get_token",
		LOGIN: "http://localhost:8000/workoutapi/login_user",
		LOGOUT: "http://localhost:8000/workoutapi/logout_user",
		GET_ALL_WORKOUTS: "http://localhost:8000/workoutapi/get_all_workouts",
		GET_WORKOUT: "http://localhost:8000/workoutapi/get_workout"
	};
	return ServicesLocator;

});