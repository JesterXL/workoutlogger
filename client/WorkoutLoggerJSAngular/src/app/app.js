angular.module('workoutlogger', [
	'ngResource',
	'templates-app',
	'templates-common',
	'workoutlogger.login',
	'workoutlogger.today',
	'ui.state',
	'ui.route'
])

	.config(function myAppConfig($stateProvider, $urlRouterProvider)
	{
		$urlRouterProvider.otherwise('/login');
	})

	.run(function run()
	{
	})

	.controller('AppController', function AppController($scope, $rootScope, $state)
	{
		$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams)
		{
			if (angular.isDefined(toState.data.pageTitle))
			{
				$scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
			}
		});

		$rootScope.$on("Login:success", function (event, args)
		{
			console.log("app::login success callback, going today");
			console.log("$state:", $state);
			$state.transitionTo("today");
		});
	});

