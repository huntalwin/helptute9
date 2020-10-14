const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    //Task 7:
    getAll: function (req, res) {
        Actor.find({}).populate('movies','title year').exec(function (err, actors) {
            if (err) 
                return res.status(404).json(err);
                res.json(actors);
            
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    //Task 2:
    deleteActorMovie: function (req,res){
        //Will delete movies that match the actor id in the actor array of the movie schema
        Movie.deleteMany({actors:req.params.id}, function(err){
            if (err) return res.status(400).json(err);
            res.json();

            Actor.findOneAndRemove({ _id: req.params.id }, function (err){
                if (err) return res.status(400).json(err);
                res.json();
            })
        });
    },
    //Task 3:
    deleteMovieFromActor: function (req,res){
        //update one filters to find the specified id and $pull will remove the movie id 
        Actor.updateOne({_id:req.params.actorid},{$pull:{movies:req.params.movieid}},function(err,actor){
            if (err) return res.status(400).json(err);
            return res.json(actor);
        });
    }
};