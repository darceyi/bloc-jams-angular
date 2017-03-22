(function() {
	 /**
 		* @function SongPlayer
 		* @desc Service that controls when a song plays, pauses
 		* @returns {SongPlayer}
 		*/
	function SongPlayer(){
		 /**
 		* @desc assigns empty object to var SongPlayer --why?
 		* @type {Object}
 		*/
		var SongPlayer = {};

		 /**
 		* @desc currently playing song
 		* @type {Object}
 		*/
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

		/*
		* @function playSong
		* @desc plays current song
		* @ param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};

		/*
		* @function SongPlayer.play
		* @desc method for the SongPlayer service that allows song playing
		* @ param {Object} song
		*/
		SongPlayer.play = function(song) {
			//If the currently playing song is not the same as the song the user clicks on, then we want to
			if (currentSong !== song) {
				setSong(song);
				playSong(song);			
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};

		/*
		* @function SongPlayer.puse
		* @desc method for the SongPlayer service that allows song pausing
		* @ param {Object} song
		*/
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