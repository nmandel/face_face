var express = require('express');
var server = express();
var bodyParser = require('body-parser');

// for saving image to local server
var fs = require('fs');
var request = require('request');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(express.static('.'));

server.listen(process.env.PORT || 3000);

server.post('/', function(req, res) {
  console.log('req.body', req.body);
  // request.get({url: dataUrl, encoding: binary}, function(err, response, body) {
  //   fs.writeFile("/img/test.jpg", body, 'binary', function(err) {
  //     if (err) {
  //       console.log('err', err);
  //     }
  //     else {
  //       console.log("File saved!");
  //     }
  //   })
  // });
})
