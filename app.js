const fs = require('fs');                   // to save the output file
const express = require('express');         // to serve the input page
const bodyParser = require('body-parser');  // to parse the request body from input page
const scrape = require('./scrape.js');      //use cheerio to scrape a target website
const opf = require('./opf.js');      //use cheerio to opf a target website
const commandLine = require('./commandLine.js');      //use cheerio to scrape a target website
const port = 3000;                          // port for the localhost to run on
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  console.log('GET /');
  // render the html page which will send back the required URL, CSS-SELECTORs and number of blogs to fetch.
  // updated to also send back author and book details:
  const html = fs.readFileSync('./statics/index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});

app.get('/exit', function(req, res){
  console.log('GET / EXITING');
  // render 'Done' and then close the server (localhost)
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Done');
  process.exit();
});


app.post('/', function(req, res){
  // post request recieves the form data from the index page
  console.log('POST /');
  console.log(req.body);
  const url = req.body.address;
  const selectorBlog = req.body.selectorBlog;
  const selectorNext = req.body.selectorNext;
  const numberOfBlogs = req.body.blogNumbers;

  opf.makeOPF(req.body.title,req.body.lang,req.body.author,req.body.copyright);
  scrape.scrapeAllBlogs(url,selectorBlog,selectorNext,numberOfBlogs).then(() => {
    commandLine.open('atom','output/index.ncx');
    console.log('KindleGenFolder/kindlegen ./output/index.opf');
    const html = fs.readFileSync('./statics/exit.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  });
});


app.use(express.static(__dirname + '/assets'));
app.listen(port);
console.log('Listening at http://localhost:' + port);
