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
	.directive('jxlEnter', function()
		{
		return function(scope, element, attrs) {
			element.bind("keydown keypress", function(event) {
				if(event.which === 13) {
					scope.$apply(function(){
						scope.$eval(attrs.jxlEnter, {'event': event});
					});

					event.preventDefault();
				}
			});
		};
	})

	.directive('routineEditor', function()
	{
		return {
			restrict: "E",
			templateUrl: "today/RoutineEditor.tpl.html"
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
		$scope.focused = false;
		$scope.todaysExercises = [];
		$scope.todaysWorkout = null;

		$scope.init = function()
		{

		};

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

		$scope.chooseExercise = function(exercise)
		{
			console.log("Today::chooseExercise, exercise:", exercise);
			$scope.todaysExercises.push(exercise);
		};

		$scope.sets = [];
		$scope.addSet = function()
		{
			console.log("Today::addSet");
			$scope.sets.push({rep_count: 0, weight: 0, rest_time: 0});

		};

		$scope.init();

	});
