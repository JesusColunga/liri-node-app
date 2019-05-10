// liri.js
// 9/May/2019
// LIRI Bot: Language Interpretation and Recognition Interface


// GLOBAL VARIABLES
// =======================================================================================
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var argArr  = process.argv.slice(3);
var params  = argArr.join (" ");


// OBJECTS
// =======================================================================================


// FUNCTIONS (Definition)
// =======================================================================================
function unknownCommand () {
    console.log("\n'" + command + "' is not recognized as a valid command for LIRI.");
};

//----------------------------------------------------------
function doWhatExec () {};

function movieExec () {};

function spotifyExec () {};

//                 ----------
function concertExError(error) {
    console.log("Error:", error);
};

function concertExOk(response) {
    console.log("Response:", response);
};

function concertExec () {
    var url = "https://rest.bandsintown.com/artists/" + params + "/events?app_id=codingbootcamp";
    console.log("url:", url);
    axios
      .get(url)
      .then(function(response) {
               concertExOk(response);
            }
      )
      .catch(function(error) {
                 concertExError(error);
             }
      );
};
//----------------------------------------------------------

function identifyCommand () {
    var comm = command.toLowerCase();
    if (comm === "concert-this"     ) { concertExec(); } else
    if (comm === "spotify-this-song") { spotifyExec(); } else
    if (comm === "movie-this"       ) { movieExec();   } else
    if (comm === "do-what-it-says"  ) { doWhatExec();  } else
    unknownCommand();
};


// FUNCTION CALLS (Execution)
// =======================================================================================
console.log ('Keys:'      , keys   );
console.log ('Command:'   , command);
console.log ('Args array:', argArr );
console.log ('Parameters:', params );
identifyCommand ();


// Creation process
// =======================================================================================
/*
npm init

npm i axios
https://www.npmjs.com/package/axios

npm i node-spotify-api
https://www.npmjs.com/package/node-spotify-api

http://www.omdbapi.com/

http://www.artists.bandsintown.com/bandsintown-api
https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0

npm i moment
https://www.npmjs.com/package/moment

npm i dotenv
https://www.npmjs.com/package/dotenv

touch .gitignore
    node_modules
    .DS_Store
    .env

touch keys.js

touch .env

------------
To retrieve the data that will power this app,
you'll need to send requests using the `axios` package
to the Bands in Town, Spotify and OMDB APIs.



*/