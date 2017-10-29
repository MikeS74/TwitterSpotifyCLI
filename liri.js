
//Required keys and node packages
var twitterKeys = require("./keys.js");
var spotify = require("./keys.js");
var request = require("request");
var fs = require('fs');

//Takes in various node arguments
var action = process.argv[2];
var nodeArgs = process.argv;

//Calls functions based on specific CLI commands
switch (action) {
	case "--help":
		helpDisplay();
		break;

	case "my-tweets":
		tweetDisplay();
		break;

	case "movie-this":
		movieDisplay();
		break;

	case "spotify-this-song":
		spotifyDisplay();
		break;

	case "do-what-it-says":
		textRead();
		break;
}

//Displays help menu with node argument --help
function helpDisplay() {
	console.log("Options:" +
		"\n\n--help\t\t\tshow this help message" +
		"\n\nmy-tweets\t\tshows mike's last 20 tweets \n\t\t\tand when they were created" +
		"\n\nspotify-this-song\tdisplays song info with a song title \n\t\t\tsupplied by the user" +
		"\n\nmovie-this\t\tdisplays movie info with a movie title \n\t\t\tsupplied by the user" +
		"\n\ndo-what-it-says\t\tsearches spotify with random.txt file");
}

//Twitter node API that displays my last 20 tweets
function tweetDisplay() {

	var params = {
		screen_name: 'mikebalance',
		count: 20
	};

	twitterKeys.twitterKeys.get('statuses/user_timeline', params, function (error, tweets, response) {

		if (!error && response.statusCode === 200) {
			for (var i = 0; i < tweets.length; i++) {
				var twentyTweets = "______________________________" +
					"\n" + "\n" + tweets[i].created_at + "\n" + "\n" + '\x1b[1m\x1b[36m' + tweets[i].text + '\x1b[0m';
				console.log(twentyTweets);

			}
		}
	});
}

//OMDB node API that displays movie info with a supplied movie title
function movieDisplay() {

	var movieName = "";

	if (process.argv[3] === undefined) {
		movieName = "Mr.+Nobody";
	}
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			movieName = movieName + "+" + nodeArgs[i];
		} else {
			movieName += nodeArgs[i];
		}
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function (error, response, body) {

		if (!error && response.statusCode === 200) {

			var obj = JSON.parse(body);
			var movieInfo = "Title: \x1b[33m\x1b[1m" + obj.Title + "\n" + "\x1b[0mYear: \x1b[33m\x1b[1m" + obj.Year + "\n" + "\x1b[0mIMDB Rating: \x1b[33m\x1b[1m" + obj.Ratings[0].Value + "\n" + "\x1b[0mRotten Tomatoes Rating: \x1b[33m\x1b[1m" + obj.Ratings[1].Value + "\n" + "\x1b[0mCountry: \x1b[33m\x1b[1m" + obj.Country + "\n" + "\x1b[0mLanguage: \x1b[33m\x1b[1m" + obj.Language + "\n" + "\x1b[0mPlot: \x1b[33m\x1b[1m" + obj.Plot + "\n" + "\x1b[0mActors: \x1b[33m\x1b[1m" + obj.Actors;

			console.log(movieInfo);
		}
	});
}

//Spotify node API that displays song info with a supplied song title
function spotifyDisplay() {

	var trackName = "";

	if (process.argv[3] === undefined) {
		trackName = "The+Sign+(+US+Album)";
	}
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			trackName = trackName + "+" + nodeArgs[i];
		} else {
			trackName += nodeArgs[i];
		}
	}

	spotify.spotify.search({
		type: 'track',
		query: trackName
	}, function (err, data) {

		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}

		var trackResp = data.tracks.items[0];
		var trackInfo = "Artist: \x1b[32m\x1b[1m" + trackResp.artists[0].name + "\n" + "\x1b[0mSong Title: \x1b[32m\x1b[1m" +
			trackResp.name + "\n" +
			"\x1b[0mPreview URL: \x1b[32m\x1b[1m" + trackResp.preview_url + "\n" + "\x1b[0mAlbum Title: \x1b[32m\x1b[1m" + trackResp.album.name;

		console.log(trackInfo);
	});
}

//Returns Spotify song data by reading a .txt file in the main directory
function textRead() {
	fs.readFile("random.txt", "utf8", function (err, data) {
		if (err) {
			return console.log(err);
		}
		data = data.split(",");
		action = data[0];
		process.argv[3] = data[1].replace(/"/g, "").split(' ').join('+');

		spotifyDisplay();
	});
};