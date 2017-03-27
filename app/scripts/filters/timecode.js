(function() {
	//Filter functions must return another function which takes at least one argument, the input of the filter – our input is seconds
	function timecode() {
		return function(seconds) {

			var toSeconds = buzz.toTimer(seconds);

			if (Number.isNaN(seconds)) {
				return '';
			}

				return toSeconds;
		};
	}

	angular
		.module('blocJams')
		.filter('timecode', timecode);

})();