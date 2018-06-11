var express = require("express");
var app = express();

app.use(function(req, res) {
  var agent = req.header("connection");
  console.log(req.param())
  res.send(200)
});

app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
