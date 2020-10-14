const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const actors = require('./routers/actorrouter');
const movies = require('./routers/movierouter');
const express = require('express');
const app = express();
const path = require('path');

app.use("/",express.static(path.join(__dirname,"dist/movieAng")));

app.listen(8080);
console.log('Server is running at http://127.0.0.1:8080');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/deleteactormovie', actors.deleteActorMovie);
//Updating requires PUT requests
app.put('/actors/:actorid/movies/:movieid', actors.deleteMovieFromActor);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id',movies.deleteOne);
app.put('/movies/:movieid/actors/:actorid', movies.deleteActorFromMovie);
app.put('/movies/:movieid/:actorid',movies.addActortoMovie);
app.get('/movies/:end/:start',movies.findMovieBetweenYear);
app.delete('/movies/:start/:end',movies.deleteMovieBetweenYear);
app.delete('/deletemovsbyYear/:cutyear',movies.deleteMoviesByYear);


//Extra Task:
app.get('/getactorbymovieyear/:yearinput',movies.actorsByMovieYear);


//Use req.params when dealing with url

// const express = require('express');
// const app = express();
// const path = require('path');

// app.use("/",express.static(path.join(__dirname,"dist/movieAng")));

// app.listen(8080);
// console.log('Server is running at http://127.0.0.1:8080');