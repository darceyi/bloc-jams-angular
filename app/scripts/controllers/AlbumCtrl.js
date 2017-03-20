(function() {
	function AlbumCtrl() {
		this.albumData = Fixtures.getAlbum();
	}
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl)
		.controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
		//We add Fixtures to AlbumCtrl's array of dependencies. Once injected, 
		//the service is available for use within the controller.
})();