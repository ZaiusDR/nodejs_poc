const http = require('http');
const url = require('url');
const fs = require('fs');
const mydate = require('./lib/datetime')

const hostname = '0.0.0.0';
const port = 3000;

const html_files = './html';
const content_type = {'Content-Type': 'text/html'};

const server = http.createServer(function(req, res) {
  var q = url.parse(req.url, true);
  var filename;
  if (q.pathname == "/") {
    filename = html_files + "/index.html"
  } else {
    filename = html_files + q.pathname;
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, content_type);
      return res.end("404 Not Found");
    }
    res.writeHead(200, content_type);
    res.write(data);
    res.write(`Super useful date line: ${mydate.myDateTime()}`)
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
