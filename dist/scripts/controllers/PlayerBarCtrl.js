//Create a new file for the PlayerBarCtrl and inject both the Fixtures and SongPlayer services into the controller:
(function() {
	function PlayerBarCtrl(Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
	}

	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();