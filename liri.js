require("dotenv").config();

let keys = require('./keys.js');
let axios = require('axios');
let moment = require('moment');
let dotenv = require('dotenv');
let fs = require('fs');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let details = process.argv[3];
console.log(command);
console.log(details);


let getMovie = function(movieName){
     debugger;
     axios.get("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy").then(
          function(response){
               // console.log(JSON.stringify(response.data, null, 4)); 
               console.log(response.data);
          }
          )
}
let getSong = function(songName){
//      // debugger;
//      // let spotify = new Spotify(keys.spotify);
//      // if(!details){
//      //      details = "Silent Night";
//      // }
//      // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//      //      if (err) {
//      //        return console.log('Error occurred: ' + err);
//      //      }
//        console.log(songName);
   
//   })
}
let getConcert = function(bandName){
     console.log(bandName)
}
let getRandom = function(){
     fs.readFile('random.txt', 'utf8', function(error, data){
          if(error){
               return console.log(error);
          }
          let dataRandom = data.split(",");
          // // if (dataRandom[0]==="spotify-this-song"){

          // }
     })
     console.log("random");
}

switch(command){
     case "movie-this":
     getMovie(details);
     break;
     case "do-what-it-says":
     getRandom();
     break;
     case "concert-this":
     getConcert(details);
     break;
     case "spotify-this-song":
     getSong(details);
     break;
     default:
     break;
}

// Bands in Town Artist Events API 
// ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 