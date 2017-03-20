(function() {
	function CollectionCtrl(Fixtures) {
		this.albums = Fixtures.getCollection(12);
	}

	angular
		.module('blocJams')
		.controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
		//The .controller() method has two parameters:
			//The name of the controller.
			//A callback function or an array that injects dependencies, 
			//with a callback function that executes when the controller is
			//initialized as the last item in the array.
})();