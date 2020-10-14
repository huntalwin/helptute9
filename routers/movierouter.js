var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
const movie = require('../models/movie');
const actor = require('../models/actor');
module.exports = {
    //Task 8:
    getAll: function (req, res) {
        Movie.find({}).populate('actors','name bYear').exec(function (err, movies) {
            if (err) 
                return res.status(404).json(err);
                res.json(movies);
            
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    //Task 1:
    deleteOne: function(req,res){
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    //Task 4:
    deleteActorFromMovie: function(req,res){
        Movie.updateOne({_id:req.params.movieid},{$pull:{actors:req.params.actorid}},function(err,movie){
            if (err) return res.status(400).json(err);
            return res.json(movie);
        });
    },
    //Task 5:
    addActortoMovie: function(req,res){
        Movie.findOne({_id:req.params.movieid},function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            Actor.findOne({_id:req.params.actorid},function(err,actor){
                if(err) return res.status(400).json(err);
                if(!actor) return res.status(404).json();
                //Actor is variable name for the result of the findOne and ._id is the id of the result
                movie.actors.push(actor._id);
                actor.movies.push(movie._id);

                actor.save(function(error,newActor){
                    console.log(newActor);
                    if(error) return res.status(400).json();

                    movie.save(function(error,newMovie){
                        if(error) return res.status(400).json();
                        console.log(newMovie);
                        return res.json({"movie":newMovie,"actor":newActor})
                    });

                }); 
            });
        });
},
//Task6:
findMovieBetweenYear: function(req,res){
   //Specify search filter:
   let search={
    $and:[
            {year:{$gte:req.params.start}},
            {year:{$lte:req.params.end}}
        ]
}
Movie.find(search,function (err,data){
    if (err) return res.status(400).json(err);
    res.json(data)
}); 

},
//Task9:
deleteMovieBetweenYear: function(req,res){
    //Specify search filter:
   let search={
    $and:[
            {year:{$gte:req.params.start}},
            {year:{$lte:req.params.end}}
        ]
    }
    Movie.deleteMany(search,function (err,data){
        if (err) return res.status(400).json(err);
        console.log(data)
        return res.json(data)
    }); 
},
    actorsByMovieYear: function (req,res){
        // return res.json(req.params)
        let actorarr=[];
        Movie.find({year:req.params.yearinput}).populate('actors','name').exec(function (err, data) {
            if (err) return res.status(404).json(err);
                for(let i=0;i<data.length;i++){
                    console.log(data[i]);
                    for(let j=0;j<data[i].actors.length;j++){
                        actorarr.push(data[i].actors[j]);
                    }
                }
                res.json(actorarr);
        });
    },
//Week 9 Tasks:
//Delete Movies Before Year:
deleteMoviesByYear: function (req,res){
    let search={ year: {$lt: req.params.cutyear} }
    Movie.deleteMany(search,function (err,data){
        console.log(err)
        if (err) return res.status(400).json(err);
        console.log(data)
        return res.json(data)
    }); 
}

}