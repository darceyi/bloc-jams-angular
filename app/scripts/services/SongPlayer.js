(function() {
	function SongPlayer(){
		var SongPlayer = {};

		var currentSong = null;

		 /**
 		* @desc Buzz object audio file
 		* @type {Object}
 		*/
		var currentBuzzObject = null;

		/**
		 * @function setSong
		 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
		 * @param {Object} song
		 */
		var setSong = function(song) {
			//Stop the currently playing song, if there is one.
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}
			//The play method creates a new Buzz object using the  song's audioUrl property and then calls Buzz's own play method on the object.
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		};

		SongPlayer.play = function(song) {
			//If the currently playing song is not the same as the song the user clicks on, then we want to
			if (currentSong !== song) {
				setSong(song);
				currentBuzzObject.play();
				song.playing = true;			
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};

		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);

})();