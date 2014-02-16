/**
 * Created by jessewarden on 2/16/14.
 */
angular.module( 'ngBoilerplate.login', [
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
	.controller( 'LoginController', function HomeController( $scope ) {

				});