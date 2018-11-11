const express = require('express');
const routes = require('./routes')

const app = express();

const hostname = '0.0.0.0';
const port = 3000;

app.use(express.json());
app.use('/', routes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
