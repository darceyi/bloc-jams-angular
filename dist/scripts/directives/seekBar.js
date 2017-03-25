(function() {
	function seekBar() {
		return {
			//Specifies a URL from which the directive will load a template.
			//The templateUrl option specifies the path to the HTML template that the directive will use.
			templateUrl: '/templates/directives/seek_bar.html',
			//Specifies what the template should replace. If true, the template replaces the directive's element. 
			//If false, the template replaces the contents of the directive's element.
			//replace: true instructs Angular to completely replace the <seek-bar> element with the directive's 
			//HTML template rather than insert the HTML between the  <seek-bar></seek-bar> tags.
			replace: true,
			//Restricts the directive to a specific declaration style: element  E
			restrict: 'E',
			//specify a new scope for the directive:
			//declaring empty scope ensures that a new scope will exist solely for the directive (isolate-scope)
			//an isolate-scope allowes us to bind functions from the directive's view to its scope
			scope: {},
			//registers DOM listeners and updates DOM; where most of the directive logic goes
			//think of it as a function that executes when the directive is instantiated in the view.
			link: function(scope, element, attributes) {
				//"attributes" is a hash of attribs with which the directive was declared
				//if we declare <seek-bar> with no attributes in the HTML, then this hash will be empy
				
				//directive logic to return
			}
		};

	}

	angular
		.module('blocJams')
		.directive('seekBar', seekBar);
		//For directives, the callback function (in this case, seekBar) is a factory function. 
		//It returns an object that describes the directive's behavior to Angular's HTML compiler. 
})();