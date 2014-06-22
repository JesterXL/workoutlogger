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
	.factory('SearchExercisesService', function($http)
	{
		return {
			searchResults: null,

			searchExercises: function(searchTerm)
			{
				var me = this;
				return $http.get("http://localhost:8001/workoutapi/search_exercises?searchTerm=" + searchTerm)
					.success(function(json)
					{
						if(json && json.response === true)
						{
							me.searchResults = json.data;
						}
					})
					.error(function(result)
					{
						console.error("SearchExercisesService::error:", result);
					});
			}
		};
	})
	.controller( 'TodayController', function TodayController( $scope, SearchExercisesService)
	{
		$scope.searchText = "";
		$scope.showSuggestions = false;
		$scope.searchResults = [];
//		$scope.exercises = [
//		{name: "Deadlift"},
//		{name: "Squat"},
//		{name: "Bench Press"},
//		{name: "Sumo Squat"},
//		{name: "Stiff Leg Deadlift"},
//		{name: "Boat"}
//		];

		$scope._showPossibleMatches = function()
		{
			var searchLen = $scope.searchText.length;
			if(searchLen === 0)
			{
				$scope.searchResults = [];
				$scope.showSuggestions = false;
				console.log("show none: ", $scope.showSuggestions);
				return;
			}

			SearchExercisesService.searchExercises($scope.searchText)
			.then(function()
			{
				var matches = _.filter(SearchExercisesService.searchResults, function(item)
				{
					var first = item.name.toLowerCase().substr(0, searchLen);
					var searchText = $scope.searchText.toLowerCase();
					return first == searchText;
				});
				$scope.searchResults = matches;
				$scope.showSuggestions = matches.length > 0;
				console.log("show: " + $scope.showSuggestions + ", matches: " + matches.length);
				return true;
			});
		};

		var debouncedShowPossibleMessages = function()
		{
			$scope.$apply($scope._showPossibleMatches);
		};
		$scope.showPossibleMatches = _.debounce(debouncedShowPossibleMessages, 100);

	});
