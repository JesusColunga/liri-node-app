// liri.js
// 11/May/2019
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


// FUNCTIONS (Definition)
// =======================================================================================
function writeKeys (data) {
    var dataSt = JSON.stringify( Object.keys(data) ).replace(/,/g, "\n");
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
    var dataSt = JSON.stringify(data);
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
function doWhatExReadFile (){
    fs.readFile("random.txt", 
                "utf8", 
                function(error, data) {
                    if (error) {
                        return console.log("Error reading file random.txt:", error);
                    };

                    var dataArr = data.split(",");

                    if (dataArr.length > 0) {
                        command = dataArr[0];
                    } else {
                        console.log("Error identifying the command from file.");
                        command = "";
                    };

                    if (dataArr.length > 1) {
                        params = dataArr[1];
                    } else {
                        params = "";
                    };

                    console.log("   - - - -");
                    identifyCommand ();
                });
};

function doWhatExec () {
    doWhatExReadFile ();
};

//                 ----------
function movieExRating (ratings){
    var rateSt = "";
    for (ct = 0; ct < ratings.length; ct ++) {
        if (ratings [ct].Source === "Rotten Tomatoes") {
            rateSt = ratings [ct].Value;
        };
    }
    return rateSt;
      
};

function movieShowInfo (info) {
    console.log (
        "\n   Title of the movie:                   ", info.Title,
        "\n   Year the movie came out:              ", info.Year,
        "\n   IMDB Rating of the movie:             ", info.imdbRating,
        "\n   Rotten Tomatoes Rating of the movie:  ", movieExRating (info.Ratings),
        "\n   Country where the movie was produced: ", info.Country,
        "\n   Language of the movie:                ", info.Language, "\n",
        "\n   Plot of the movie:                    ",
        "\n", info.Plot, "\n",
        "\n   Actors in the movie:                  ",
        "\n", info.Actors, "\n"
    );
};

function movieExError(error) {
    console.log("Error:", error);
};

function movieExOk(response) {
    if (response.data.Response === "True") {
        movieShowInfo (response.data);
    } else {
        console.log (response.data.Error);
    };
};

function movieExec () {
    if (params === "") { params = "Mr. Nobody"};
    var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + params;
    axios
      .get(url)
      .then(function(response) {
               movieExOk(response);
            }
      )
      .catch(function(error) {
               movieExError(error);
             }
      );
};

//                 ----------
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
    console.log ('Command:'   , command);
    console.log ('Parameters:', params );
    var comm = command.toLowerCase();
    if (comm === "concert-this"     ) { concertExec(); } else
    if (comm === "spotify-this-song") { spotifyExec(); } else
    if (comm === "movie-this"       ) { movieExec();   } else
    if (comm === "do-what-it-says"  ) { doWhatExec();  } else
    unknownCommand();
};


// FUNCTION CALLS (Execution)
// =======================================================================================
identifyCommand ();
