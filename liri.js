// liri.js
// 10/May/2019
// LIRI Bot: Language Interpretation and Recognition Interface


// GLOBAL VARIABLES
// =======================================================================================
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var argArr  = process.argv.slice(3);
var params  = argArr.join (" ");
var fs = require("fs");
var moment = require ("moment");


// OBJECTS
// =======================================================================================


// FUNCTIONS (Definition)
// =======================================================================================
function showInfo (item, index) {
    //console.log ("Item:", item, "Index:", index);
    console.log (
        "\n----- ", index, " -----",
        "\n   Name of the venue:", item.venue.name,
        "\n   Venue location:   ", item.venue.country + ", " + item.venue.city,
        "\n   Date of the event:", moment(item.venue.datetime).format("MM/DD/YYYY")
    );
};

function writeKeys (data) {
    dataSt = JSON.stringify( Object.keys(data) ).replace(/,/g, "\n");
    fs.writeFile("log.txt", 
                 dataSt, 
                 function(err) {
                    if (err) {
                        return console.log("Error writing the log file:", err);
                    }
                    console.log("Log file created.");
                 }
                );
};

function writeLog (data) {
    dataSt = JSON.stringify(data);
    //console.log ("JSON:", dataSt);
    fs.writeFile("log.txt", 
                 dataSt, 
                 function(err) {
                    if (err) {
                        return console.log("Error writing the log file:", err);
                    }
                    console.log("Log file created.");
                 }
                );
};

function showKeys (resp) {
    console.log ("===================");
    console.log ("Keys:", Object.keys(resp));
};

function unknownCommand () {
    console.log("\n'" + command + "' is not recognized as a valid command for LIRI.");
};

//----------------------------------------------------------
function doWhatExec () {};

function movieExec () {};

//                 ----------
function spotifyShowInfoArtists () {
    var st = "";
};

function spotifyShowInfo (item, index) {
    var artSt = "";
    item.artists
    .forEach(
       function(value, index){
           artSt === "" ? artSt = value.name : artSt += ", " + value.name;
       }
    );
    console.log (
        "\n----- ", index, " -----",
        "\n   Artist:      ", artSt,
        "\n   Song's name: ", item.name,
        "\n   Link:        ", item.preview_url,
        "\n   Album:       ", item.album.name
    );
};

function spotifyExError(error) {
    console.log("Error:", error);
};

function spotifyExOk(response) {
    response.tracks.items.forEach( spotifyShowInfo  );
};

function spotifyExec () {
    if (params === "") { params = "The Sign by Ace of Base" };
    spotify
    .search({ type: 'track', 
              query: params })
    .then(function(response) {
        spotifyExOk(response);
    })
    .catch(function(error) {
        spotifyExError(error);
    });
};

//                 ----------
function concertShowInfo (item, index) {
    console.log (
        "\n----- ", index, " -----",
        "\n   Name of the venue:", item.venue.name,
        "\n   Venue location:   ", item.venue.country + ", " + item.venue.city,
        "\n   Date of the event:", moment(item.venue.datetime).format("MM/DD/YYYY")
    );
};

function concertExError(error) {
    console.log("Error:", error);
};

function concertExOk(response) {
    response.data.forEach(concertShowInfo);
};

function concertExec () {
    var url = "https://rest.bandsintown.com/artists/" + params + "/events?app_id=codingbootcamp";
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
//console.log ('Keys:'      , keys   );
console.log ('Command:'   , command);
//console.log ('Args array:', argArr );
console.log ('Parameters:', params );
identifyCommand ();

