/**
 * Created by jessewarden on 2/24/14.
 */
angular.module( 'workoutlogger.login')
.factory('LoginService', function ($http, TokenService)
{
	var LoginService = {

		user: null,


		login: function(username, password)
		{
			if(username == null)
			{
				throw new Error("LoginService::login, username cannot be null.");
			}

			if(password == null)
			{
				throw new Error("LoginService::login, password cannot be null.");
			}

			var me = this;
			if(TokenService.token == null)
			{
				return TokenService.getToken().success(function(data)
				{
					return me._loginWithToken(TokenService.token, username, password);
				});
			}
			else
			{
				return me._loginWithToken(TokenService.token, username, password);
			}
		},

		_loginWithToken: function(token, username, password)
		{
			var dataObject = {
				username: username,
				password: password
			};
			var dataObjectJSON = JSON.stringify(dataObject);
			console.log("dataObject:", dataObject);
			console.log("dataObjectJSON:", dataObjectJSON);
			var headers = {};
			headers["X-CSRFToken"] = token;

			var me = this;
			return $http.post('http://localhost:8000/workoutapi/login_user',
				dataObject,
				{
					widthCredentials: true
				})
				.success(function()
				{
					console.log("LoginWithToken::success");
				})
				.error(function()
				{
					console.log("LoginWithToken::error");
				});

		}
	};
	return LoginService;

});