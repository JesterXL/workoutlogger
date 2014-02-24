/**
 * Created by jessewarden on 2/24/14.
 */
angular.module( 'workoutlogger.login')
.factory('LoginService', ['$resource', 'TokenService', function ($resource, TokenService)
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
			headers["Content-Type"] = "text/plain";
			headers["Accept"] = "text/plain";
			var me = this;
			var loginPOSTService = $resource('http://localhost:8000/workoutapi/login_user',
				{},
				{
					post:{
						method:"POST",
						isArray:false,
						headers: headers,
						withCredentials: true
					}
				});
			var promise = loginPOSTService.post(dataObjectJSON, function(data)
			{
				if(data && data.response === true)
				{
					me.user = data.data;
				}
				console.log("loginPOSTService::data:", data);
				console.log("promise:", promise);
			});
//					.success(function(data)
//					{
//						if(data && data.response === true)
//						{
//							me.user = data.data;
//						}
//					})
//					.error(function(data)
//					{
//						console.error("LoginService::onError");
//						console.error(arguments);
//						if(data == "FORBIDDEN")
//						{
//							console.error("CSRF verification failed. Request aborted.");
//						}
//					});
			return promise;
		}
	};
	return LoginService;

}]);