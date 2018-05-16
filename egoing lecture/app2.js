var express = require("express");
var app = express();
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.send("Hello home page");
});

app.get("/test", function(req, res) {
  res.send('Hello Router, <img src="abc.jpg">');
});

app.get("/login", function(req, res) {
  res.send("Login please");
});

app.get("/dynamic", function(req, res) {
  var lis = "";
  for (i = 0; i < 5; i++) {
    lis = lis + "<li>coding</li>";
  }
  var date = new Date();

  var output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        Hello static!
        ${lis}
        ${date}
    </body>
    </html>`;
  res.send(output);
});

app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
