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

			//We want Angular to treat the on-change attribute differently than the value or max attributes. 
			//We don't want on-change to act like a number, string, or static object. Instead, we want the 
			//directive to evaluate the on-change expression and execute it. To make sure the directive
			//evaluates the attribute, we'll attach it to the directive's scope, rather than the attributes object. 
			//Scoping the attribute allows us the flexibility to specify how we want to handle the value passed to
			//the on-change attribute:
			//The & in the isolate scope object is a type of directive scope binding.
			//he & binding type provides a way to execute an expression in the context of the parent scope
			scope: {
				onChange: '&'
			},

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

				var seekBar = $(element);

				//To monitor the value changes of these attributes in a manner specific to this directive, 
				//we have to "observe" them. We can notify the directive of all changes to attribute values by 
				//using the $observe method on the Angular attributes object:
				//This code observes the values of the attributes we declare in the HTML by specifying the attribute name in the 
				//first argument. When the observed attribute is set or changed, we execute a callback (the second argument) 
				//that sets a new scope value (newValue) for the scope.value and scope.max attributes.We use the directive's scope 
				//to determine the location of the seek bar thumb, and correspondingly, the playback position of the song.
				attributes.$observe('value', function(newValue) {
					scope.value = newValue;
				});

				attributes.$observe('max', function(newValue) {
					scope.max = newValue;
				});
			
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
					//We need to pass the updated value to the onChange attribute. To do so, we'll write a function 
					//to call in the onClickSeekBar and trackThumb methods that will send the updated scope.value 
					//to the function evaluated by onChange:
					notifyOnChange(scope.value);
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
             				notifyOnChange(scope.value);
         				});
     				});
 
     				$document.bind('mouseup.thumb', function() {
        				$document.unbind('mousemove.thumb');
         				$document.unbind('mouseup.thumb');
     				});
 				};

				//We name the function notifyOnChange because its purpose is to notify onChange that scope.value has changed.
 				var notifyOnChange = function(newValue) {
 					//We test to make sure that scope.onChange is a function. If a future developer fails to pass a function 
 					//to the on-change attribute in the HTML, the next line will not be reached, and no error will be thrown.
     				//We pass a full function call to the on-change attribute in the HTML
     				//scope.onChange() calls the function in the attribute.
     				if (typeof scope.onChange === 'function') {
     					//The function we pass in the HTML has an argument, value, which isn't defined in the view (remember 
     					//that it's not the same as scope.value). Using built-in Angular functionality, we specify the value 
     					//of this argument using hash syntax. Effectively, we're telling Angular to insert the local newValue 
     					//ariable as the value argument we pass into the SongPlayer.setCurrentTime() function called in the view.
         				scope.onChange({value: newValue});
     				}
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