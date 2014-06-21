angular.module( 'workoutlogger.today', [
	'ngResource',
	'ui.state'
])
	.config(function config( $stateProvider ) {
		$stateProvider.state( 'today', {
			url: '/today',
			views: {
				"main": {
					controller: 'TodayController',
					templateUrl: 'today/today.tpl.html'
				}
			},
			data:{ pageTitle: 'Today' }
		});
	})
	.directive('ngEnter', function()
		{
		return function(scope, element, attrs) {
			element.bind("keydown keypress", function(event) {
				if(event.which === 13) {
					scope.$apply(function(){
						scope.$eval(attrs.ngEnter, {'event': event});
					});

					event.preventDefault();
				}
			});
		};
	})
	.controller( 'TodayController', function TodayController( $scope)
	{
		$scope.searchText = "";
		$scope.showSuggestions = false;
		$scope.searchResults = [];
		$scope.exercises = [
		{name: "Deadlift"},
		{name: "Squat"},
		{name: "Bench Press"},
		{name: "Sumo Squat"},
		{name: "Stiff Leg Deadlift"},
		{name: "Boat"}
		];

		$scope._showPossibleMatches = function()
		{
			$scope.$apply(function()
			{
				var searchLen = $scope.searchText.length;
				if(searchLen === 0)
				{
					$scope.searchResults = [];
					$scope.showSuggestions = false;
					console.log("show none: ", $scope.showSuggestions);
					return;
				}
				var matches = _.filter($scope.exercises, function(item)
				{
//				return item.name.indexOf($scope.searchText > -1);
					var first = item.name.toLowerCase().substr(0, searchLen);
					var searchText = $scope.searchText.toLowerCase();
					return first == searchText;
				});
				$scope.searchResults = matches;
				$scope.showSuggestions = matches.length > 0;
				console.log("show: ", $scope.showSuggestions);
			});
		};
		$scope.showPossibleMatches = _.debounce($scope._showPossibleMatches, 100);

	});
