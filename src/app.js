const express = require('express');
const film = require('./controllers/Film');
const app = express();

const hostname = '0.0.0.0';
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({'message': 'Catapumchinchin!'})
});


app.post('/api/v1/films', film.Film.create);
app.get('/api/v1/films', film.Film.getAll);
app.get('/api/v1/films/:id', film.Film.getOne);
app.put('/api/v1/films/:id', film.Film.update);
app.delete('/api/v1/films/:id', film.Film.delete);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
