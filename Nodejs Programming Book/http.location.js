var http = require("http");
http
  .createServer(function(req, res) {
    res.writeHead(302, { Location: "http://naver.com" });
    res.end();
  })
  .listen(3000, function() {
    console.log("Connected, 3000 port!");
  });
