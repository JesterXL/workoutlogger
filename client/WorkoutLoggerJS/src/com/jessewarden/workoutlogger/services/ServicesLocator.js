define([], function()
{

	var ServicesLocator = {

		GET_TOKEN: "http://localhost:8000/workoutapi/get_token",
		LOGIN: "http://localhost:8000/workoutapi/login_user",
		LOGOUT: "http://localhost:8000/workoutapi/logout_user",
		GET_ALL_WORKOUTS: "http://localhost:8000/workoutapi/get_all_workouts",
		GET_WORKOUT: "http://localhost:8000/workoutapi/get_workout",
		LOGGED_IN: "http://localhost:8000/workoutapi/logged_in",
		CREATE_SET: "http://localhost:8000/workoutapi/add_set_to_exercise",
		DELETE_SET: "http://localhost:8000/workoutapi/delete_set",
		UPDATE_SET: "http://localhost:8000/workoutapi/update_set"
	};
	return ServicesLocator;

});