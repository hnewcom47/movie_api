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

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use(express.static('public'));

app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something\'s not right!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });