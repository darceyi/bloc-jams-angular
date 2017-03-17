
//Providers are services used by Angular modules to either configure 
//or define default behavior for a certain Angular module. 
(function() {
	function config($stateProvider, $locationProvider) {
		//$locationProvider (angular's core) configures an application's paths
		
		//For example, if we navigate to a state with the path /album, the full URL will read  
		//localhost:3000/#!/album. It doesn't look nice, but we can disable it:
        //By setting the html5Mode method's enabled property to true, the hashbang URLs are disabled; that is, users will see clean URLs without the hashbang. 
		$locationProvider
         	.html5Mode({
            	 enabled: true,
            	 requireBase: false
         	});


        //$stateProvider, a component of UI-Router, will determine a number of properties for a state. 
        //For Bloc Jams, we'll need to know how to configure at least four aspects of a state: 
        //its name, URL route, controller, and template
        $stateProvider
        	.state('landing', {
        		url: '/',
                controller: 'LandingCtrl as landing',
        		templateUrl: '/templates/landing.html'
        	})
        	.state('album', {
        		url: '/album',
                controller: 'AlbumCtrl as album',
        		templateUrl: '/templates/album.html'
        	})
        	.state('collection', {
        		url: '/collection',
                controller: 'CollectionCtrl as collection',
        		templateUrl: '/templates/collection.html'
        	});
        	//chained calls
            //When chaining method calls, it is common to see each call happen own its own line.
	}

// angular.module('blocJams', ['ui.router']);
//The first argument passed, blocJams, is the prescribed name of the module. 
//empty array, passed as the second argument, injects dependencies into an application
	angular
		.module('blocJams', ['ui.router'])
		.config(config);

})();