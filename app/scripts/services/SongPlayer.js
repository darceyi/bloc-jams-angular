(function() {
	 /**
 		* @function SongPlayer
 		* @desc Service that controls when a song plays, pauses
 		* @returns {SongPlayer}
 		*/
	function SongPlayer(Fixtures){
		 /**
 		* @desc assigns empty object to var SongPlayer
 		* @type {Object}
 		*/
		var SongPlayer = {};

		/**
 		* @desc stores album information from Fixtures service
 		* @type {Object}
 		*/
		var currentAlbum = Fixtures.getAlbum();


		/*
		* @function getSongIndex
 		* @desc gets index of a song
 		* @param {Object} song
 		* @returns index of song
 		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

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
				stopSong();
			}
			//The play method creates a new Buzz object using the  song's audioUrl property and then calls Buzz's own play method on the object.
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			SongPlayer.currentSong = song;
		};

		/*
		* @function playSong
		* @desc plays current song
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};

		/*
		* @function stopSong
		* @desc stops current song
		* @param {Object} song
		*/
		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		};
	
		 /**
 		* @desc currently playing songActive song object from list of songs
 		* @type {Object}
 		*/
 		//CP 8 change the private attribute SongPlayer.currentSong into a public attribute named  SongPlayer.SongPlayer.currentSong so that we can use it within the player bar
		SongPlayer.currentSong = null;

		/*
		* @function SongPlayer.play
		* @desc method for the SongPlayer service that allows song playing
		* @ param {Object} song
		*/
		SongPlayer.play = function(song) {
			//We only need to know the currently playing song, which we can access via the service. 
			//The second step to make the player bar work is to update play and pause to account for the fact that the player bar can't pass song as an argument.
			// The first condition occurs when we call the methods from the Album view's song rows, and the second condition occurs when we call the methods from the player bar.
			song = song || SongPlayer.currentSong;
			//If the currently playing song is not the same as the song the user clicks on, then we want to
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);			
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		/*
		* @function SongPlayer.previous
		* @desc method for the SongPlayer service to go to previous song
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			//for when the first song is playing (index = 0), we'll want to stop the current song and set the value of the currentply playing song to the first song
			if (currentSongIndex < 0 ) {
				stopSong();
			} else {
				//moves to previous song and automatically plays it
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/*
		* @function SongPlayer.next
		* @desc method for the SongPlayer service to go to next song
		*/
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/*
		* @function SongPlayer.pause
		* @desc method for the SongPlayer service that allows song pausing
		* @ param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['Fixtures', SongPlayer]);

})();