var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var twitterKeys = new Twitter({
    consumer_key: '3oTYhUbqMa4QJTpnFPAveyL6w', 
	consumer_secret: 'GgiaD6wAJc1bpffEQdhDZZPv3q60r5IwxfvwCTDRPkzf6z0wJJ', 
	access_token_key: '59594626-i7HEgDkeKKphdBHsshue7mXMHC7Li7DI8lowSFcMs', 
	access_token_secret: 'wYujscx2rXquLYc3dQ27QFNsyQjeSBtSfQtkmWUlHRrV6'
});

var spotify = new Spotify({
    id: 'f7762630dac04d1eb458389b7a330d1c', 
	secret: 'fd06150952494678899f3ae4b6a90e1a'
});

module.exports= {
    twitterKeys: twitterKeys, 
	spotify: spotify
};