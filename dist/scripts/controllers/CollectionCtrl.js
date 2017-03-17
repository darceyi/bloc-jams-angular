(function() {
	function CollectionCtrl() {
		//bind the data from the  albumPicasso object to the Collection template
		//We add an albums property and set its value to an empty array. Within the for loop, 
		//we use angular.copy to make copies of albumPicasso and push them to the array.
		this.albums = [];
		for (var i = 0; i < 12; i++) {
			//angular.copy: Creates a deep copy of source, which should be an object or an array.
			this.albums.push(angular.copy(albumPicasso));
		}
	}

	angular
		.module('blocJams')
		.controller('CollectionCtrl', CollectionCtrl);
})();