(function () {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name yoNewAngularApp
	 * @description
	 * # yoNewAngularApp
	 *
	 * Main module of the application.
	 */
	angular
		.module('yoNewAngularApp')
		.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, LOCALE) {

			/**
			 * we need to set crossdomain cookie for develop only
			 * remove this in production version
			 */
			$httpProvider.defaults.withCredentials = true;

			var defaultLocale = LOCALE.DE;

			//localization config
//			$translateProvider.useLoader('$localizationProvider');
//			$translateProvider.preferredLanguage(defaultLocale);
//			$translateProvider.useCookieStorage();

			$stateProvider
				.state('main', {
					url: '/',
					views: {
						'': {
							templateUrl: 'app/components/main/main.html',
							controller: 'MainCtrl',
							controllerAs: 'main'
						}
					}
				})
				.state('about', {
					url: '/about',
					views: {
						'': {
							templateUrl: 'app/components/about/about.html',
							controller: 'AboutCtrl',
							controllerAs: 'about'
						}
					}
				});

			$urlRouterProvider.otherwise('/');
		})
		.run(function ($translate, $rootScope, $state) {

			var locale = $translate.preferredLanguage();
			$rootScope.locale = locale;

			$rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
			});

			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
				if (!(fromState.hasOwnProperty('abstarct') && fromState.name === '')) {
					$state.previous = fromState;
				}
			});

			$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, error) {
				console.log(error);
			});
		});
})();
