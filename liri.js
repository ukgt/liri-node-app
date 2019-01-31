require("dotenv").config();

let keys = require('./keys.js');
let axios = require('axios');
let moment = require('moment');
let dotenv = require('dotenv');
let fs = require('fs');
let bandsintown = require('bandsintown')('codingbootcamp');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let details = process.argv[3];
console.log(command);
console.log(details);


let getMovie = function (movieName) {
     debugger;
     axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
          function (response) {
               // console.log(JSON.stringify(response.data, null, 4)); 
               // console.log(response.data);
               console.log("Title: " + response.data.Title);
               console.log("Year: " + response.data.Year);
               console.log("Rated: " + response.data.Rated);
               console.log("IMDB Rating: " + response.data.imdbRating);
               console.log("Country: " + response.data.Country);
               console.log("Language: " + response.data.Language);
               console.log("Plot: " + response.data.Plot);
               console.log("Actors: " + response.data.Actors);
               console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value);
          }
     )
}
// Function for Spotify Search:
let getSong = function (songName) {
     debugger;
     if (songName === undefined) {
          songName = "Scandalon";
     }
     spotify.search({
          type: 'track',
          query: songName,
          limit: 10
     }, function (err, data) {
          if (err) {
               return console.log('Error occurred: ' + err);
          }
          let songs = data.tracks.items;
          for (let i = 0; i < songs.length; i++) {
               // console.log(data.tracks.items[0])
               console.log("Artist(s): " + data.tracks.items[0].name);
               console.log("Song Name: " + data.tracks.items[0].name);
               console.log("Preview Link: " + data.tracks.items[0].preview_url);
               console.log("Album: " + data.tracks.items[0].album.name);
          }

     })
}
// Bands in Town Artist Events API 
// let getConcert = function (bandName) {
//      debugger;
//      let queryURL = ("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
//      axios.get(queryURL).then(
//           function(response){
//               var jsonData = response.data;
//               console.log('DataL: ', jsonData);
//           }
//      );
//      };
    
     let getConcert = function(bandName) {
          debugger;
          if (!details) {
              details = "Mercy Me";
          }
          axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
          .then(function(response) {
              for (var i = 0; i < response.data.length; i++) {
      
                  console.log("Venue Name: "+ response.data[i].venue.name);
                  console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                  console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
              }
          });
      }   

let getRandom = function () {
     fs.readFile('random.txt', 'utf8', function (error, data) {
          if (error) {
               return console.log(error);
          }
          let dataRandom = data.split(",");
          if (dataRandom[0] === "spotify-this-song") {
               let songName = dataRandom[1].slice(1,-1);
               console.log(songName);
               
          }else if(dataRandom[0] === 'movie-this'){
               let movieName = dataRandom[2].slice(1,-1);
               console.log(movieName);
          }
     })
}

switch (command) {
     case "movie-this":
          getMovie(details);
          break;
          case "spotify-this-song":
          getSong(details);
          break;
     case "concert-this":
          getConcert(details);
          break;
     case "do-what-it-says":
          getRandom();
          break;
     default:
          break;
}