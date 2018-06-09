var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
http
  .createServer(function(req, res) {
    fs.readFile("./EJSpage.ejs", "utf8", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(ejs.render(data,{
        name : "RITE",
        description : "AAA" 
      
      }));
    });
  })
  .listen(3000, function() {
    console.log("Connected, 3000 port!");
  });
