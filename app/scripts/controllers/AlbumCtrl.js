(function() {
	function AlbumCtrl(Fixtures) {
		this.albumData = Fixtures.getAlbum();
		//AlbumCtrl uses Fixtures's getAlbum() method to get the albumPicasso object.
	}
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
		//We add Fixtures to AlbumCtrl's array of dependencies. Once injected, 
		//the service is available for use within the controller.
})();