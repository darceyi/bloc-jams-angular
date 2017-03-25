(function() {

	//Now that we can calculate the seek bar's value, we'll add the first of two functions: one to call when a user clicks on the seek bar:
	//Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it.
	//inject $document as a dependency
	function seekBar($document) {

		//Calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred.
		var calculatePercent = function(seekBar, event) {
			var offsetX = event.pageX - seekBar.offset().left;
     		var seekBarWidth = seekBar.width();
     		var offsetXPercent = offsetX / seekBarWidth;
     		offsetXPercent = Math.max(0, offsetXPercent);
     		offsetXPercent = Math.min(1, offsetXPercent);
     		return offsetXPercent;
		};


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
			//the only place we use any jquery would be in the link function (jqLite)
			link: function(scope, element, attributes) {
				//The link method's first argument is its scope object. Attributes and methods on the scope object are
				//accessible within the directive's view.
				//The second argument is the jqLite-wrapped element that the directive matches.
				//The third argument is a hash of attributes with which the directive was declared. If we declare 
				//<seek-bar> with no attributes in the HTML, then this hash will be empty.
				
				//directive logic to return

				//Holds the value of the seek bar, such as the currently playing song time or the current volume. Default value is 0.
				scope.value = 0;

				//Holds the maximum value of the song and volume seek bars. Default value is 100.
				scope.max = 100;

				//A function that calculates a percent based on the value and maximum value of a seek bar.
				var percentString = function() {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				};

				//Returns the width of the seek bar fill element based on the calculated percent.
				scope.fillStyle = function() {
					return {width: percentString()};
				};

				//updates the position of the seek bar thumb.
				scope.thumbStyle = function() {
					return {left: percentString()};
				};

				//Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar.
				scope.onClickSeekBar = function(event) {
					var percent = calculatePercent(seekBar, event);
					scope.value = percent * scope.max;
				};

				//function we need to implement is for when a user drags the seek bar thumb
				//Similar to scope.onClickSeekBar, but uses $apply to constantly apply the 
				//change in value of scope.value as the user drags the seek bar thumb.
				//scope.trackThumb function should execute when a user interacts with the thumb class element in the view. 
				//More specifically, when the event is a mousedown event. 
				scope.trackThumb = function() {
     				$document.bind('mousemove.thumb', function(event) {
        				var percent = calculatePercent(seekBar, event);
         				scope.$apply(function() {
             				scope.value = percent * scope.max;
         				});
     				});
 
     				$document.bind('mouseup.thumb', function() {
        				$document.unbind('mousemove.thumb');
         				$document.unbind('mouseup.thumb');
     				});
 				};
			}
		};

	}

	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar]);
		//For directives, the callback function (in this case, seekBar) is a factory function. 
		//It returns an object that describes the directive's behavior to Angular's HTML compiler. 
})();