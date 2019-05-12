# liri-node-app
Language Interpretation and Recognition Interface (LIRI Bot),

 a command line Node JS app  that takes in parameters and gives you back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

To make this app work, after cloning you should add an .env file with the following content:

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

Remember the execution should be:

node liri.js  <command>  <search term>

If looking for a movie and the name contents special characters you may use "" to specify the name of the movie (node liri.js movie-this "Mr. & Mrs. Smith").

Please check "log.txt" for a demo of commands and results.

If the search of a command fails, a message in command line will let you know:

![1557631464474](/home/jc/.config/Typora/typora-user-images/1557631464474.png)

![1557631850522](/home/jc/.config/Typora/typora-user-images/1557631850522.png)

![1557632015831](/home/jc/.config/Typora/typora-user-images/1557632015831.png)