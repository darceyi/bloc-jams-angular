(function() {
	function LandingCtrl() {

	}

	angular
		//Note that the .module() call does not have the second argument, the array of dependencies. Because we've set the 
		//dependencies in app.js, we only need to retrieve the already-defined module.
		.module('blocJams')
		//The .controller() method has two parameters:
		//Name
		//A callback function (OR an array that injects dependencies, with a callback function as the last item in the array).
		.controller('LandingCtrl', LandingCtrl);
})();