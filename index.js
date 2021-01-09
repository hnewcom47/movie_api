const express = require('express');
    morgan = require('morgan');
    mongoose = require('mongoose');
    Models = require('./models.js');
    bodyParser = require('body-parser');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

// Returns a list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Returns data about a single movie, by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.findOne({Title: req.params.Title})
    .then((movie) => {
        res.status(201).json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Returns information about a genre, by name/title
app.get('/movies/Genres/:Title', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.findOne({Title: req.params.Title})
    .then((movie) => {
        res.status(201).json(movie.Genre.Name + '. ' + movie.Genre.Description);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Returns information about a director, by name
app.get('/movies/Directors/:Name', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.findOne({'Director.Name' : req.params.Name})
    .then((movie) => {
        res.status(201).json(movie.Director.Name + ': ' + movie.Director.Bio);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Allows (post) new user registration
app.post('/users', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOne({Username: req.body.Username})
    .then((user) => {
        if(user) {
            return res.status(400).send(req.body.Username + 'already exists');
        } else {
            Users.create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) => {
                res.status(201).json(user)
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//Allows (put) users to update their user information
app.put('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, {$set:
        {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
        }
    },
    {new: true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.status(201).json(updatedUser);
        }
    });
});

//Allows (post) users to add a movie to their list of favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndUpdate(
        {Username: req.params.Username},
        {$push: {FavoriteMovies: req.params.MovieID}
        },
    {new: true},
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

//Allows users to remove (delete) a movie from their list of favorites
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndUpdate(
        {Username: req.params.Username},
        {$pull: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

//Deletes a user from database/allows existing users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndRemove({
        Username: req.params.Username
    })
    .then((user) => {
        if(!user) {
            res.status(400).send(req.params.Username + ' was not found.');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

app.use(express.static('public'));

app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something\'s not right!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });