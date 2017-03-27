(function() {
	//Filter functions must return another function which takes at least one argument, the input of the filter – our input is seconds
	function timecode() {
		return function(seconds) {

			var seconds = Number.parseFloat(seconds);

			if (Number.isNaN(seconds)) {
				return '-:--';
			}

            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;
 
            var output = minutes + ':';
 
            if (remainingSeconds < 10) {
                output += '0';   
            }
 
            output += remainingSeconds;

			return output;
		};
	}

	angular
		.module('blocJams')
		.filter('timecode', timecode);

})();