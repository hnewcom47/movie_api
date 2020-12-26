const express = require('express');
    morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [
    {
        title: 'The Lord of the Rings: The Two Towers',
        director: 'Peter Jackson',
        year: '2002',
        genre: 'Fantasy, Adventure, Action'
    },
    {
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
        director: 'Gore Verbinski',
        year: '2003',
        genre: 'Adventure, Action'
    },
    {
        title: 'Parasite',
        director: 'Bong Joon-ho',
        year: '2019',
        genre: 'Thriller, Comedy, Drama'
    },
    {
        title: 'Beetlejuice',
        director: 'Tim Burton',
        year: '1988',
        genre: 'Comedy, Horror, Fantasy'
    },
    {
        title: 'The Hobbit: The Battle of the Five Armies',
        director: 'Peter Jackson',
        year: '2014',
        genre: 'Fantasy, Adventure, Action'
    },
    {
        title: 'The Matrix',
        director: 'Lana & Lilly Wachowski',
        year: '1999',
        genre: 'Action, Sci-Fi'
    },
    {
        title: 'Kill Bill: Vol. 1',
        director: 'Quentin Tarantino',
        year: '2003',
        genre: 'Action, Crime, Thriller'
    },
    {
        title: 'John Wick',
        director: 'Chad Stahelski',
        year: '2014',
        genre: 'Action, Crime, Thriller'
    },
    {
        title: 'A Knight\'s Tale',
        director: 'Brian Helgeland',
        year: '2001',
        genre: 'Action, Adventure, Romance'
    },
    {
        title: 'The Mummy Returns',
        director: 'Stephen Sommers',
        year: '2001',
        genre: 'Action, Adventure, Fantasy'
    }
]

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

// Returns a list of all movies
app.get('/movies', (req, res) => {
    res.send('Successful GET request on returning data on all movies');
});

//Returns data about a single movie, by title
app.get('/movies/:title', (req, res) => {
    res.send('Successful GET request returning data by movie title: ' + req.params.title);
});

//Returns information about a genre, by name/title
app.get('/movies/genres/:genre', (req, res) => {
    res.send('Successful GET request returning data on genre: ' + req.params.genre);
});

//Returns information about a director, by name
app.get('/movies/directors/:name', (req, res) => {
    res.send('Successful GET request returning data on director: ' + req.params.name);
});

//Allows (post) new user registration
app.post('/users', (req, res) => {
    res.send('Successful POST request registering new user.');
});

//Allows (put) users to update their user information
app.put('/users/:username', (req, res) => {
    res.send('Successful PUT request updating information for user: ' + req.params.username);
});

//Allows (post) users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieID', (req, res) => {
    res.send('Successful POST request adding ' + req.params.movieID + ' to favorite movie list.');
});

//Allows users to remove (delete) a movie from their list of favorites
app.delete('/users/:username/movies/:movieID', (req, res) => {
    res.send('Successful DELETE request removing ' + req.params.movieID + ' from favorite movie list.');
});

//Deletes a user from database/allows existing users to deregister
app.delete('/users/:username', (req, res) => {
    res.send('Successful DELETE request removing user: ' + req.params.username + ' from database.');
});

app.use(express.static('public'));

app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something\'s not right!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });