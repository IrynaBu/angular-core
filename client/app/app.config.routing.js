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
		.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, tmhDynamicLocaleProvider, LOCALE, PATH_CONFIG) {

			/**
			 * we need to set crossdomain cookie for develop only
			 * remove this in production version
			 */
			$httpProvider.defaults.withCredentials = true;

			var defaultLocale = LOCALE.DE;

			//localization config
			$translateProvider.useStaticFilesLoader({
				prefix: PATH_CONFIG.TRANSLATE_JSON_PATH + 'translation_',
				suffix: '.json'
			}).registerAvailableLanguageKeys(['en', 'de'], {
				'en_EN': 'en', 'de_DE': 'de'
			});
			$translateProvider.preferredLanguage(defaultLocale);
			$translateProvider.useCookieStorage();

			//Angular Dynamic Locale config
			tmhDynamicLocaleProvider.localeLocationPattern(PATH_CONFIG.I18N_PATH_TEMPLATE);

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
