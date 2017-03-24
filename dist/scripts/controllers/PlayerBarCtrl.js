//Create a new file for the PlayerBarCtrl and inject both the Fixtures and SongPlayer services into the controller:
(function() {
	function PlayerBarCtrl(Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
		console.log(this.albumData, "this.albumData");
		console.log(this.songPlayer, "this.songPlayer");
		// console.log(SongPlayer, "SongPlayer");
		console.log(SongPlayer.currentSong, "SongPlayer.currentSong");
	}

	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();