var fs = require("fs");
var app = require("express")();
var server = require("http").createServer();
var io = require("socket.io").listen(server);

server.listen(3000, function() {
  console.log("Connected 3000 port!");
});

server.on("request", function(req, res) {
  fs.readFile("./qqq.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

io.sockets.on("connection", function(socket) {
  var name = null

  socket.on("setname", function(data) {
    name = data
    console.log(name)
  });

  socket.on("getname", function() {
    console.log(name)
    socket.emit("responsename", name);
  });
});
