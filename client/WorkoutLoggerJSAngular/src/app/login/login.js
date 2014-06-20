/**
 * Created by jessewarden on 2/16/14.
 */

// create a new module
angular.module( 'workoutlogger.login', [
		'ngResource',
		'ui.state'
	])
	.config(function config( $stateProvider ) {
				$stateProvider.state( 'login', {
					url: '/login',
					views: {
						"main": {
							controller: 'LoginController',
							templateUrl: 'login/login.tpl.html'
						}
					},
					data:{ pageTitle: 'Login' }
				});
			})

	.factory('TokenService', function ($http)
	{
		var TokenService = {
			token: null,
			getToken: function()
			{
				console.log("TokenService::getToken");
				var me = this;
				return $http.get('http://localhost:8000/workoutapi/get_token')
					.success(function(data, status, headers, config)
					{
						if(data && data.response === true)
						{
							me.token = data.data.token;
						}
					})
					.error(function(data, status, headers, config)
					{
						console.error("TokenService::getToken failed:", data);
						console.error("status:", status);
						console.error("status:", headers);
						console.error("status:", config);
					});
			}
		};
		return TokenService;
	})



	.controller( 'LoginController', ['$scope', 'LoginService', function LoginController( $scope, LoginService)
	{
		$scope.myModel = {};
		$scope.myModel.someValue = "hello";
		$scope.username = null;
		$scope.password = null;

		$scope.onLogin = function()
		{
			console.log("login::onLogin, username: " + $scope.username + ", password: " + $scope.password);
			LoginService.login($scope.username, $scope.password);
		};
	}]);