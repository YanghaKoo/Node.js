const http = require("http");
const fs = require("fs");
const socketio = require("socket.io");

var server = http
  .createServer((req, res) => {
    fs.readFile("./hyml.html", (err, data) => {
      if (err) {
        console.log("Error");
      } else {
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(data);
      }
    });
  })
  .listen(3000, function() {
    console.log("connected");
  });

var io = socketio.listen(server);
io.sockets.on("connection", function(socket) {
  console.log("C");

  socket.on("rint", function(data) {
    data = data + "입니다"
    console.log(data);
    //socket.emit("smart",data)  // 기존

    io.sockets.emit("smart", data); // public 통신
    //socket.broadcast.emit("smart",data) // broadcast 통신
    //io.sockets.sockets[socket.id].emit("smart",data) // private 통신
  });
});
