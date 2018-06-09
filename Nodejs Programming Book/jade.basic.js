var http = require("http");
var fs = require("fs");
var jade = require("jade");

http
  .createServer(function(req, res) {
    fs.readFile("./jadepage.jade", "utf8", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      var fn = jade.compile(data);
      res.end(fn({name: "RITA", age : 3}))
    });
  })
  .listen(3000, function() {
    console.log("Connected, 3000 port!");
  });
