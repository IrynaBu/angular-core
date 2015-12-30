(function () {
	'use strict';

	angular.module('yoNewAngularApp')
	/**
	 * @name PATH_CONFIG
	 */
		.constant('PATH_CONFIG', {
			//Path for server services
			REST_API_PATH: 'http://localhost:8080/service/',
			//Path for localization JSON
			TRANSLATE_JSON_PATH: 'assets/localization/'
		})

		.constant('LOCALE', {
			EN: 'en_EN',
			DE: 'de_DE'
		})
})();
