
var express = require("express");
var app     = express();
var path    = require("path");


app.use(express.static(__dirname + '/Views'));
//Store all HTML files in view folder.


app.get('/',function(req,res){
  res.sendFile(path.join('index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/show',function(req,res){
  res.sendFile(path.join('show.html'));
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

